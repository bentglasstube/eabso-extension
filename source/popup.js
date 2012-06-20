$(document).ready( function() {
  chrome.extension.sendRequest({action: 'getOpts'}, function(settings) {
    chrome.tabs.getSelected(null, function(tab) {
      var data = {
        "uri": tab.url,
        "user": settings.username,
        "hide": settings.hidden
      };

      chrome.extension.sendRequest({
        action: 'shorten',
        uri:    tab.url,
        user:   settings.username,
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

