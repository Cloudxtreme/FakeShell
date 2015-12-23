/**
 * FakeShell.js is a component that adds a ui component to mock a shell.
 * This JavaScript code is not intended to build a fully functional
 * shell.  It is meant for a fun UI component with limited features.
 **/
(function (document, window) {

  window.shell= window.shell || { $PATH: {} };

  /**
   * The configuration variables for our canvas element.
   **/
  var canvasConfig = {
    id: 'fakeshell',
    personalization: {
      background: '#000',
      cursor: '#00ff00',
      font: '20px Andale Mono',
      text: '#00ff00'
    },
    gutterSize: 10,
    lineHeight: 20,
    shellChar: '> ',
    height: window.innerHeight * .75,
    width: window.innerWidth * .95
  };

  var blinkingCursorIntervalId = null;

  /**
   * The canvas element activing as the display for our shell.
   **/
  var canvas = document.getElementById(canvasConfig.id);
  canvas.height = canvasConfig.height || canvas.height;
  canvas.width = canvasConfig.width || canvas.width;

  /**
   * This holds the history of output of the shell.
   **/
  var history = [];

  /**
   * This is the line accepting active input from the user.
   **/
  var activeLine = canvasConfig.shellChar;

  /**
   * Initializes the initial state of the canvas upon first load or clear.
   **/
  function drawCanvas(config, canvas) {
    var context = canvas.getContext('2d');
    context.fillStyle = config.personalization.background;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = config.personalization.text;
    context.font = config.personalization.font;
    context.textBaseline = 'top';

    var currentLineHeight = fixHistoryOverflow();

    // Displays the console history on screen.
    for (var i = 0; i < history.length; i++) {
      var lineHeight = canvasConfig.lineHeight * i + canvasConfig.gutterSize;
      context.fillText(history[i], config.gutterSize, lineHeight);
    }

    // Draws the current line at the bottom.
    var textMetrics = context.measureText(activeLine);
    context.fillText(activeLine, config.gutterSize, currentLineHeight);

    context.fillStyle = config.personalization.cursor;
    context.fillRect(config.gutterSize + textMetrics.width, currentLineHeight, 12, canvasConfig.lineHeight);

    // Text doesn't yet wrap.
    // TODO: Add text wrap.

    // Interval for a blinking cursor.
    var bit = false;
    blinkingCursorIntervalId = window.setInterval(function () {
      bit = !bit;
      var color = bit ? config.personalization.background : config.personalization.cursor;
      context.fillStyle = color;
      context.fillRect(config.gutterSize + textMetrics.width, currentLineHeight, 12, canvasConfig.lineHeight);
    }, 500);
  }

  /**
   * Handles the input from a user (e.g. displayable ascii characters).
   **/
  function inputFromUser(keyCode) {
    window.clearInterval(blinkingCursorIntervalId);
    if (keyCode == 8) {
      // If the keycode is backspace remove the last character
      activeLine = activeLine.length > 2 ? activeLine.slice(0, -1) : activeLine;
    } else {
      activeLine += String.fromCharCode(keyCode);
    }
    drawCanvas(canvasConfig, canvas);
  }

  /**
   * Submits a command to be proceed.
   **/
  function submitCommand() {
    window.clearInterval(blinkingCursorIntervalId);
    history.push(activeLine);
    // removes shell characters and unneccessary white space to process command.
    var commandInput = activeLine.replace(new RegExp('^' + canvasConfig.shellChar + '\\s*') , '')
    var commands = commandInput.split(' ');

    // TODO: Process command.
    if (typeof window.shell.$PATH[commands[0].toLowerCase()] == 'function') {
      var args = commands.length > 1 ? commands.slice(1) : [];
      history = window.shell.$PATH[commands[0]](history, args);
    }

    activeLine = canvasConfig.shellChar;
    drawCanvas(canvasConfig, canvas);
  }

  /**
   * This violates Single Responsibility Principle (for now).
   *
   * This clear the history that won't show on the display (old history) and it
   * recalculates the currentLineHeight to print the next line on screen.
   **/
  function fixHistoryOverflow() {
    // Calculates the current line height, that is, the location.height of the active cursor.
    var currentLineHeight = history.length <= 0 ? canvasConfig.gutterSize : canvasConfig.lineHeight * history.length + canvasConfig.gutterSize;
    var maxHeight = canvas.height - (canvasConfig.gutterSize * 2) - ((canvas.height - (canvasConfig.gutterSize * 2)) % canvasConfig.lineHeight);
    if (currentLineHeight > maxHeight) {
      history.shift();
      currentLineHeight -= canvasConfig.lineHeight;
      currentLineHeight = fixHistoryOverflow();
    }

    return currentLineHeight;
  }

  /**
   * The canvas element is not focusable.  So we'll fake it until they
   * make it!
   **/
   (function() {
     var focusedElement = canvas;
     window.addEventListener('mousedown', function(e) {
       focusedElement = e.target;
     }, false);

     window.addEventListener('keypress', function (e) {
       if(focusedElement == canvas) {
         var keyCode = e.keyCode;
         switch(keyCode) {
           case 13: submitCommand(); break;
           default: inputFromUser(e.keyCode);
         }
       }
     }, true);

     window.addEventListener('keydown', function (e) {
       if(focusedElement == canvas) {
         var keyCode = e.keyCode;
         switch(keyCode) {
           // Backspace
           case 8: inputFromUser(keyCode);
         }
       }
     }, true);
   }());

  // draws the initial state of the canvas.
  drawCanvas(canvasConfig, canvas);
  window.shell = shell;
} (document, window));
