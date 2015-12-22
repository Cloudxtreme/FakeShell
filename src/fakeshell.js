/**
 * FakeShell.js is a component that adds a ui component to mock a shell.
 * This JavaScript code is not intended to build a fully functional
 * shell.  It is meant for a fun UI component with limited features.
 **/
(function (document, window) {
  /**
   * The configuration variables for our canvas element.
   **/
  var canvasConfig = {
    id: 'fakeshell',
    backgroundColor: '#000',
    font: {
      color: '#aaa',
      style: '20px Andale Mono'
    },
    gutterSize: 10,
    shellChar: '> ',
    height: undefined,
    widht: undefined
  }

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

  var activeLine = canvasConfig.shellChar;

  /**
   * Initializes the initial state of the canvas upon first load or clear.
   **/
  function drawCanvas(config, canvas) {
    var context = canvas.getContext('2d');
    context.fillStyle = config.backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = config.font.color;
    context.font = config.font.style;
    context.textBaseline = 'top';

    // Draws the current line at the bottom.
    context.fillText(activeLine, config.gutterSize, config.gutterSize);
    context.fillRect(config.gutterSize + 24, config.gutterSize, 12, 20);

    // Draws the history.
    // TODO: draw.

    var bit = false;
    blinkingCursorIntervalId = window.setInterval(function () {
      bit = !bit;
      var color = bit ? config.backgroundColor : config.font.color;
      context.fillStyle = color;
      context.fillRect(config.gutterSize + 24, config.gutterSize, 12, 20);
    }, 500);
  }

  function inputFromUser(keyCode) {
    window.clearInterval(blinkingCursorIntervalId);
    activeLine += String.fromCharCode(keyCode);
    console.log(activeLine);
    drawCanvas(canvasConfig, canvas);
  }

  function submitCommand() {
    window.clearInterval(blinkingCursorIntervalId);
    history.push(activeLine);

    drawCanvas(canvasConfig, canvas);
    activeLine = canvasConfig.shellChar;
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
           case 13: submitCommand();
           default: inputFromUser(e.keyCode);
         }
       }
     }, true);
   }());

  drawCanvas(canvasConfig, canvas);
} (document, window));
