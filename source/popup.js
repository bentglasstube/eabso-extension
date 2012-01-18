$(document).ready( function() {
  chrome.extension.sendRequest({action: 'getOpts'}, function(settings) {
    chrome.tabs.getSelected(null, function(tab) {
      var data = {
        "uri": tab.url,
        "user": settings.username,
        "hide": settings.hidden
      };

      $.post('http://eab.so/', data, function(response) {
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

