"use strict"
var GameClock = require('./gameclock');
var moment = require('moment');

var display = '88:88';
var speedup = function(){
  console.log("correcting...");
  clock.setTime("00:05");
};

var clock = new GameClock("12:00", function(time) {
  if (time !== display){
    display = time;
    console.log(display);
  }
}, function(quarter){
  console.log('CHANGE PLACES! QUARTER NOW', quarter);
  clock.start();
  setTimeout(speedup, 5000);
}, function(quarter){
  console.log('HALFTIME! QUARTER IS NOW', quarter);
  setTimeout(function(){
    console.log('HALFTIME IS ENDED! RESTARTING GAME');
    clock.start();
    setTimeout(speedup, 5000);
  }, 3000);
}, function(quarter){
  console.log('GAME ENDED!');
});

console.log('STARTING GAME');
clock.start();
setTimeout(speedup, 5000);
