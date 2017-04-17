"use strict"

var moment = require('moment');
var GameClock = function(quarterLength, renderCallback, quarterCallback, halftimeCallback, endCallback) {
  var qtrCount = 1; // Quarter counter
  var qtrLength = moment(quarterLength, "mm:ss Z");
  var clock = qtrLength; // quaterLength minutes in milliseconds
  var offset;
  var myInterval;
  var callback;
  var render, handleQuarter, handleHalftime, handleEnd; // callbacks;

  if (renderCallback){
    if (typeof renderCallback !== "function"){
      throw 'renderCallback is not a function';
    }
    render = renderCallback;
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

    clock = moment(newTime, "mm:ss Z");
  };

  var reset = function(){
    stop();
    clock = qtrLength;
  };

  var update = function(){
    clock = clock - deltaTime();

    // Handle quarters
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

    // Render
    if (render) render(moment(clock).format('mm:ss'));
  };

  var start = function(){
    if(!myInterval) {
      offset = Date.now();
      myInterval = setInterval(update, 100);
      update();
    }
  };

  var deltaTime = function() {
    var now = Date.now();
    var d = now - offset;
    offset = now;
    return d;
  };

  var stop = function(){
    clearInterval(myInterval);
    myInterval = null;
    offset = null;
  };

  return {
    start: start,
    stop: stop,
    reset: reset,
  };
}



module.exports = GameClock;
