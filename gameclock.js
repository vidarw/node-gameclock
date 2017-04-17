"use strict"

var moment = require('moment');
var GameClock = function(quarterLength, renderCallback, quarterCallback, halftimeCallback, endCallback) {
  var qtrCount = 1; // Quarter counter
  var qtrLength = moment(quarterLength, "mm:ss Z");
  var clock = qtrLength; // quaterLength minutes in milliseconds
  var offset;
  var myInterval;
  var callback;
  var handleRender, handleQuarter, handleHalftime, handleEnd; // callbacks;

  if (renderCallback){
    if (typeof renderCallback !== "function"){
      throw 'renderCallback is not a function';
    }
    handleRender = renderCallback;
  }

  if (quarterCallback){
    if (typeof quarterCallback !== "function"){
      throw 'quarterCallback is not a function';
    }
    handleQuarter = quarterCallback;
  }

  if (halftimeCallback){
    if (typeof halftimeCallback !== "function"){
      throw 'halftimeCallback is not a function';
    }
    handleHalftime = halftimeCallback;
  }


  if (endCallback){
    if (typeof endCallback !== "function"){
      throw 'endCallback is not a function';
    }
    handleEnd = endCallback;
  }

  var render = function(){
    // Render
    if (handleRender) handleRender(moment(clock).format('mm:ss'));
  };

  var handleEvents = function(){
    // Handle events
    if (clock < moment("00:00", "mm:ss Z")){
      reset();
      qtrCount = qtrCount + 1;
      if (qtrCount > 4){
        if (handleEnd) handleEnd(qtrCount);
      } else if(qtrCount === 3){
        if (handleHalftime) handleHalftime(qtrCount);
      } else {
        if (handleQuarter) handleQuarter(qtrCount);
      }
    }
  }

  var reset = function(){
      clock = qtrLength;
      render();
  };

  var addSeconds = function(n){
    clock = clock + (n * 1000);
    render();
  };

  var setTime = function(newTime){
    clock = moment(newTime, "mm:ss Z");
    render();
  };

  var update = function(){
    var now = Date.now();
    var deltaTime = now - offset;
    offset = now;

    clock = clock - deltaTime;
    handleEvents();
    render();
  };

  var toggle = function(){
    if(!myInterval) {
      start();
    } else {
      stop();
    }
    render();
  };

  var start = function(){
    if(!myInterval) {
      offset = Date.now();
      myInterval = setInterval(update, 100);
      render();
    }
  };

  var stop = function(){
    clearInterval(myInterval);
    myInterval = null;
    offset = null;
    render();
  };

  return {
    start: start,
    stop: stop,
    toggle: toggle,
    reset: reset,
    setTime: setTime,
    addSeconds: addSeconds
  };
}



module.exports = GameClock;
