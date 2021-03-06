// Setup Canvas
var canvas = document.body.appendChild( document.createElement( 'canvas' ) );

// Get WebGL Context
var gl = require('gl-context')( canvas, render );

// Import StackGL Webgl
var glGeometry = require('gl-geometry');
var glShader = require('gl-shader');
var clear = require('gl-clear')();
var glslify = require('glslify');

// Import Math Libraries
var mat4 = require('gl-matrix').mat4;

// Import Web Helper Libraries
var fit = require('canvas-fit');
var isMobile = require('is-mobile');

// Set the canvas size to fill the window and its pixel density
var mobile = isMobile( navigator.userAgent );
var dpr = mobile ? 1 : ( window.devicePixelRatio || 1 );
window.addEventListener( 'resize', fit( canvas, null, dpr ), false );

//Setup Matricies
var projection = mat4.create();
var model = mat4.create();
var view = mat4.create();

//Setup Shaders
var vertexShader = glslify( './shaders/shader.vert' );
var fragmentShader = glslify( './shaders/shader.frag' );
var shader = glShader( gl, vertexShader, fragmentShader );

function update() {
  // Set Perspective Projection
  var aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
  var fieldOfView = Math.PI / 4.0;
  var near = 0.01;
  var far  = 1000.0;
  mat4.perspective( projection, fieldOfView, aspectRatio, near, far );
}

function render() {
  update();

  gl.viewport( 0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight );
  clear( gl );

  // Set Blending
  gl.disable( gl.DEPTH_TEST );
  gl.enable( gl.BLEND );
  gl.blendFunc( gl.SRC_ALPHA, gl.ONE );
}
