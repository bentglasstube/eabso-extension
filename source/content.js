window.addEventListener('keyup', function(e) {
  chrome.extension.sendRequest({ action: 'getOpts' }, function(settings) {
    var letter = String.fromCharCode(e.keyCode).toLowerCase();

    if (e.shiftKey) letter = letter.toUpperCase();
    if (e.ctrlKey) letter = '^' + letter;

    console.log('pressed ' + letter);

    if (letter == settings.keybind) {
      chrome.extension.sendRequest({
        action: 'shorten',
        uri:    document.location.href,
        user:   settings.username,
      }, function(response) {
        if (response.error) {
          console.log('error: ' + response.error);
        } else {
          console.log('result: ' + response.result);
        }
      });
    }
  });
});
