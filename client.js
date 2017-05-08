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
