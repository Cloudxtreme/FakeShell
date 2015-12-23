(function (window) {
  var shell = window.shell || {}
  shell.$PATH.cd = changeDirectory;
  shell.$PATH.clear = clearScreen;
  shell.$PATH.cls = clearScreen;
  shell.$PATH.ls = listing;
  window.shell = shell;

  function changeDirectory(history, args) {
    if (args.length < 1) { return history; }

    switch(args[0].toLowerCase()) {
      case 'about': window.location.href = '/About'; break;
      case "blog": window.location.href = '/Blog'; break;
      case "projects": window.location.href = "/Projects"; break;
      default:
        history.push('-fakeshell: cd: ' + args[0] + ': No such file or directory');
        return history;
    }
  }

  function clearScreen(history) {
    history = [];

    return history;
  };

  function listing (history) {
    history.push("   About");
    history.push("   Blog");
    history.push("   Projects");

    return history;
  }
} (window));
