(function (window) {
  var shell = window.shell || {};
  shell.$PATH = shell.$PATH || {};
  
  // These commands need to be all lower casing. We are calling them
  // using toLowerCase().
  shell.$PATH.cd = changeDirectory;
  shell.$PATH.clear = clearScreen;
  shell.$PATH.cls = clearScreen;
  shell.$PATH.ls = listing;
  shell.$PATH.fakeshell = fakeShell;
  window.shell = shell;

  function changeDirectory(history, args) {
    if (args.length < 1) { return history; }

    switch(args[0].toLowerCase()) {
      // TODO: this should be made configurable and work in conjunction with listing
      case 'about':
        window.location.href = '/About';
        break;
      case 'blog':
        window.location.href = '/Blog';
        break;
      case 'projects':
        window.location.href = '/Projects';
        break;
      default:
        history.push('-fakeshell: cd: ' + args[0] + ': No such file or directory');
        return history;
    }
  }

  function clearScreen(history) {
    history = [];

    return history;
  };

  function fakeShell(history, args) {
    if (args.length < 1) { args.push('-help'); }

    switch(args[0].toLowerCase()) {
      case '-help':
        history.push('   -help:          # list commands and display help');
        history.push('   -repository:    # git repository url');
        history.push('   -version:       # display version');
        // TODO: display a list of available plugins.
        break;
      case '-repository':
        history.push("   Git Repository: https://github.com/sgmeyer/FakeShell");
        break;
      case '-version':
        history.push('   FakeShell.js version .0.0.1 installed.');
        history.push('   Git Repository: https://github.com/sgmeyer/FakeShell');
        break;
      default:
        history.push("   '" + args[0] + "' is not a fakeshell command.")
        history.push("   To get started with FakeShell.js run 'fakeshell -help'.")
    }
    return history;
  }

  function listing (history) {
    // TODO: this should be made configurable and work in conjunction with changeDirectory
    history.push('   About');
    history.push('   Blog');
    history.push('   Projects');

    return history;
  }
} (window));
