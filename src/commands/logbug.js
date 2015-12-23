/**
 * This plug-in allows a user to log a bug against a few projects I have
 * specified.  This directs the user directly to the appropriate github.com
 * issue tracker for a new issue.
 **/

(function (window) {
  var shell = window.shell || {};
  shell.$PATH = shell.$PATH || {};
  // These commands need to be all lower casing. We are calling them
  // using toLowerCase().
  shell.$PATH.logbug = {
    execute: logBug,
    name: 'logbug',
    description: 'Navigation for logging bugs.'
  };;
  window.shell = shell;

  function logBug(history, args) {
    if (args.length < 1) { args.push('-help'); }

    switch(args[0].toLowerCase()) {
        case '-fakeshell':
            window.location = 'https://github.com/sgmeyer/fakeshell/issues/new';
            break;
        case'-help':
          history.push("Did you find a bug?  If so please tell me about it.");
          history.push('   -help:               # options for logging a bug')
          history.push('   -fakeshell:          # bug was found in FakeShell.js');
          history.push('   -superspaceodyssey   # bug was found in Super Space Odyssey');
          history.push('   -website:            # bug exists on the website (shawnmeyer.com)');
          break;
        case '-superspaceodyssey':
            window.location = 'https://github.com/sgmeyer/superspaceodyssey/issues/new';
            break;
        case '-website':
          window.location = 'https://github.com/sgmeyer/ShawnMeyer.com/issues/new';
          break;
        default:
          history.push("   '" + args[0] + "' is not a logbug command.")
          history.push("   To get started with logbug run 'logbug -help'.")
      }

      return history;
  }
}(window));
