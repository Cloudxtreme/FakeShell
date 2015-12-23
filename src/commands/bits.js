/**
 * This is where you put in your custom welcome message.  This bit of
 * code will display before the user is prompted for entry of a command.
 **/

(function (window) {
  var shell = window.shell || {};
  shell.$PATH = shell.$PATH || [];
  // These commands need to be all lower casing. We are calling them
  // using toLowerCase().
  shell.$PATH.bits = {
    execute: bits,
    name: 'bits',
    description: 'He does not do much here, but he is my hubot.'
  };

  window.shell = shell;

  function bits(history, args) {
      history.push("My name is Bits, and I am a Hubot.  I am used to deploy this site.");
      history.push('If you want to see what I can do go to my repository.');
      history.push('');
      history.push('Repository: https://github.com/sgmeyer/bits');

      return history;
  }
}(window));
