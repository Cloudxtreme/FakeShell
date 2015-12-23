(function (window) {
  var shell = window.shell || {}
  shell.$PATH.ls = ls;
  shell.$PATH.clear = clearScreen;
  shell.$PATH.cls = clearScreen;
  window.shell = shell;

  function ls (history) {
    history.push("   About Me");
    history.push("   Blog");
    history.push("   Project");

    return history;
  }

  function clearScreen(history) {
    history = [];

    return history;
  };
} (window));
