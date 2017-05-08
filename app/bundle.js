/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var display = '88:88';
	var timerElement = document.getElementById('timer');
	var quarterElement = document.getElementById('quarter');
	var body = document.getElementById("body");

	var socket = io();

	socket.on('update', function (data) {
	  console.log(data);
	  timerElement.innerHTML = data.time;
	  quarterElement.innerHTML = 'PERIOD ' + data.quarter;
	});

	alert("Commands:\n\n<Space> Start/Stop\n<Backspace> Reset\n<+> Add 1 second\n<Shift><+> Add 10 seconds\n<-> Remove 1 second\n<Shift><-> Remove 10 seconds");

	document.addEventListener("keydown", function(event){
	    if (event.key === " "){
	      socket.emit('command', 'toggle');
	    } else if (event.key === "Backspace") {
	      console.log("Resetting clock");
	      socket.emit('command', 'reset');
	    } else if (event.key === "+") {
	      if (event.shiftKey){
	        console.log("Adding ten seconds");
	        socket.emit('command', 'addTen');
	        //clock.addSeconds(10);
	      } else {
	        console.log("Adding one second");
	        socket.emit('command', 'addOne');
	        //clock.addSeconds(1);
	      }
	    } else if (event.key === "-") {
	      if (event.shiftKey){
	        console.log("Removing ten second");
	        socket.emit('command', 'removeTen');
	        //clock.addSeconds(-10);
	      } else {
	        console.log("Removing one second");
	        socket.emit('command', 'removeOne');
	        //clock.addSeconds(-1);
	      }
	    }
	});


/***/ }
/******/ ]);