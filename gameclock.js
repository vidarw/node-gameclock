"use strict"

var moment = require('moment');
var GameClock = function(quarterLength, renderCallback, quarterCallback, halftimeCallback, endCallback) {
  const initialScore = 0;
  const initialTimeouts = 3;

  var possession = null;
  var homeScore = initialScore;
  var awayScore = initialScore;
  var homeTimeouts = initialTimeouts;
  var awayTimeouts = initialTimeouts;
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
    if (handleRender) handleRender({
      time: moment(clock).format('mm:ss'),
      quarter: qtrCount,
      possession: possession,
      homeScore: homeScore,
      homeTimeouts: homeTimeouts,
      awayScore: awayScore,
      awayTimeouts: awayTimeouts
    });
  };

  var handleEvents = function(){
    // Handle events
    if (clock < moment("00:00", "mm:ss Z")){
      if (qtrCount > 3){
        resetFull();
        if (handleEnd) handleEnd(qtrCount);
        return;
      } else if(qtrCount === 2){
        resetTimeouts();
        if (handleHalftime) handleHalftime(qtrCount);
      } else {
        if (handleQuarter) handleQuarter(qtrCount);
      }
      qtrCount = qtrCount + 1;
      resetPeriod();
    } else if (clock > moment(qtrLength, "mm:ss Z")){
      resetPeriod();
    }
  }

  var resetTimeouts = function(){
      homeTimeouts = initialTimeouts;
      awayTimeouts = initialTimeouts;
  };

  var resetPeriod = function(){
      clock = qtrLength;
      render();
  };

  var resetFull = function(){
      stop();
      clock = qtrLength;
      qtrCount = 1;
      homeScore = initialScore;
      homeTimeouts = initialTimeouts;
      awayScore = initialScore;
      awayTimeouts = initialTimeouts;
      possession = null;
      render();
  };

  var setTime = function(newTime){
    clock = moment(newTime, "mm:ss Z");
    handleEvents();
    render();
  };

  var addTime = function(t){
    clock = clock + (t * 1000);
    handleEvents();
    render();
  };

  var setHomeScore = function(n){
    homeScore = n;
  };

  var addHomeScore = function(n){
    homeScore = homeScore + n;
  };

  var setHomeTimeouts = function(n){
    homeTimeouts = n;
  }

  var useHomeTimeout = function(){
    if (homeTimeouts > 0) homeTimeouts = homeTimeouts - 1;
  }

  var setAwayScore = function(n){
    awayScore = n;
  };

  var addAwayScore = function(n){
    awayScore = awayScore + n;
  };

  var setAwayTimeouts = function(n){
    awayTimeouts = n;
  };

  var useAwayTimeout = function(){
    if (awayTimeouts > 0) awayTimeouts = awayTimeouts - 1;
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
    resetPeriod: resetPeriod,
    resetFull: resetFull,
    setTime: setTime,
    addTime: addTime,
    setHomeScore: setHomeScore,
    addHomeScore: addHomeScore,
    setHomeTimeouts: setHomeTimeouts,
    useHomeTimeout: useHomeTimeout,
    setAwayScore: setAwayScore,
    addAwayScore: addAwayScore,
    setAwayTimeouts: setAwayTimeouts,
    useAwayTimeout: useAwayTimeout
  };
}



module.exports = GameClock;
