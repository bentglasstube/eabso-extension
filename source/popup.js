$(document).ready( function() {
  chrome.extension.sendMessage({action: 'getOpts'}, function(settings) {
    chrome.tabs.getSelected(null, function(tab) {
      var data = {
        "uri": tab.url,
        "user": settings.username,
        "hide": settings.hidden
      };

      chrome.extension.sendMessage({
        action: 'shorten',
        uri:    tab.url,
      }, function(response) {
        if (response.error) {
          $('p').addClass('error');
          $('p').text(response.error);
        } else {
          $('p').text(response.result);
        }
      });
    });
  });
});

