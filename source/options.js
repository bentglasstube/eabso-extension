function display_key(key) {
  var display = '';

  if (key[0] == '^') {
    display = 'Control ';
    key = key[1];
  }

  if (key == key.toUpperCase()) {
    display += 'Shift ';
  }

  display += key.toUpperCase();

  return display;
}

function valid_key(code) {
  if (code >= 48 && code <= 57) return true;
  if (code >= 65 && code <= 90) return true;

  return false;
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('username').value = localStorage.username || '';
  document.getElementById('shortcut').value = display_key(localStorage.keybind || '^S');
});

document.getElementById('username').addEventListener('keyup', function() {
  localStorage.username = document.getElementById('username').value;
});

document.getElementById('shortcut').addEventListener('keyup', function(e) {
  e.preventDefault();
});

document.getElementById('shortcut').addEventListener('keydown', function(e) {
  if (valid_key(e.keyCode)) {
    var letter = String.fromCharCode(e.keyCode).toLowerCase();

    if (e.shiftKey) letter = letter.toUpperCase();
    if (e.ctrlKey)  letter = '^' + letter;

    localStorage.keybind = letter;
    document.getElementById('shortcut').value = display_key(letter);
  } else {
    localStorage.keybind = '';
    document.getElementById('shortcut').value = '';
  }

  e.preventDefault();
});

