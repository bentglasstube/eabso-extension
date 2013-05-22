var settings = localStorage;
if (settings.username == undefined) settings.username = "";
if (settings.keybind  == undefined) settings.keybind  = "^S";

function shareLink(uri, respond) {
  console.log("Sharing " + uri + " as " + settings.username);

  $.post('http://eab.so/', {
    uri:  uri,
    user: settings.username,
  }, function(response) { if (respond) respond(response) });
}

chrome.extension.onMessage.addListener(function(req, sender, respond) {
  if (req.action == 'getOpts') {
    respond(settings);
  } else if (req.action == 'shorten') {
    shareLink(req.uri, respond);
    return true;
  }
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  var uri;
  if (info.menuItemId == "image") {
    uri = info.srcUrl;
  } else if (info.menuItemId == "link") {
    uri = info.linkUrl;
  } else if (info.menuItemId == "page") {
    uri = info.pageUrl;
  }

  shareLink(uri);
});

chrome.runtime.onInstalled.addListener(function() {
  var contexts = ["link", "image", "page"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Share " + context + " with #eatabrick";
    var id = chrome.contextMenus.create({"title": title, "contexts": [context], "id":context });
  }
});

