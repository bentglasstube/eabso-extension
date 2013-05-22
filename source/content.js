window.addEventListener('keyup', function(e) {
  chrome.extension.sendMessage({ action: 'getOpts' }, function(settings) {
    var letter = String.fromCharCode(e.keyCode).toLowerCase();

    if (e.shiftKey) letter = letter.toUpperCase();
    if (e.ctrlKey) letter = '^' + letter;

    if (letter == settings.keybind) {
      chrome.extension.sendMessage({
        action: 'shorten',
        uri:    document.location.href,
      });
    }
  });
});
