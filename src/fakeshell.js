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
      style: '20px Georia'
    },
    shellChar: '>',
    height: undefined,
    widht: undefined
  }

  /**
   * The canvas element activing as the display for our shell.
   **/
  var canvas = document.getElementById(canvasConfig.id);
  canvas.height = canvasConfig.height || canvas.height;
  canvas.width = canvasConfig.width || canvas.width;

  /**
   *
   **/
  var history = [];

  /**
   * Initializes the initial state of the canvas upon first load or clear.
   **/
  function drawCanvas(config, canvas) {

    var context = canvas.getContext('2d');
    context.fillStyle = config.backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = config.font.color;
    context.font = config.font.style;
    context.fillText(config.shellChar, 10, 90);

    history.push(config.shellChar);

    context.fillRect(25, 75, 10, 20);
  }

  function pushLine(line) {
    var context = {};

    history.push(line);
  }

  drawCanvas(canvasConfig, canvas);
} (document, window));
