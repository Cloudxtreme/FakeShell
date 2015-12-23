/**
 * This is where you put in your custom welcome message.  This bit of
 * code will display before the user is prompted for entry of a command.
 **/

(function (window) {
  var shell = window.shell || {};
  shell.init = init;
  window.shell = shell;

  function init(history) {
      history.push('       v        HH    HH  IIIIII  !!');
      history.push('   v ( 0o )     HH    HH    II    !!');
      history.push('    \\ \\ -/      HH    HH    II    !!');
      history.push('      \\HI       HH    HH    II    !!');
      history.push('       IM\\      HH====HH    II    !!');
      history.push('       BI  \\    HH    HH    II    !!');
      history.push('       TS   ^   HH    HH    II      ');
      history.push('      /  \\      HH    HH    II    !!');
      history.push('     /    \\     HH    HH  IIIIII  !!');
      history.push('');
      history.push('');
      history.push("Hi, I am Shawn and he's my robot Bits.")
      history.push('');
      history.push("To get started enter 'ls' or 'fakeshell -help'.");
      history.push('');
  }
}(window));
