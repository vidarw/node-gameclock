var GameClock = require('./gameclock');
var display = '88:88';
var timerElement = document.getElementById('timer');
var quarterElement = document.getElementById('quarter');
var body = document.getElementById("body");

var clock = new GameClock("12:00", function(currentTime) {
  if (currentTime !== display){
    display = currentTime;
    timerElement.innerHTML = currentTime;
    console.log(display);
  }
}, function(quarter){
  console.log('CHANGE PLACES! QUARTER NOW', quarter);
  quarterElement.innerHTML = "PERIOD " + quarter;
  clock.stop();
}, function(quarter){
  console.log('HALFTIME! QUARTER IS NOW', quarter);
  quarterElement.innerHTML = "PERIOD " + quarter;
  clock.stop();
}, function(quarter){
  console.log('GAME ENDED!');
  quarterElement.innerHTML = "GAME ENDED!";
  clock.stop();
});

// document.addEventListener("click", function(){
//     clock.toggle();
// });

document.addEventListener("keydown", function(event){
    if (event.key === " "){
      clock.toggle();
    } else if (event.key === "Backspace") {
      console.log("Resetting clock");
      clock.reset();
    } else if (event.key === "+") {
      if (event.shiftKey){
        console.log("Adding ten seconds");
        clock.addSeconds(10);
      } else {
        console.log("Adding one second");
        clock.addSeconds(1);
      }
    } else if (event.key === "-") {
      if (event.shiftKey){
        console.log("Removing ten second");
        clock.addSeconds(-10);
      } else {
        console.log("Removing one second");
        clock.addSeconds(-1);
      }
    }
});
