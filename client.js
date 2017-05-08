var display = '88:88';
var timerElement = document.getElementById('timer');
var quarterElement = document.getElementById('quarter');
var body = document.getElementById("body");

var socket = io();

socket.on('update', function (data) {
  console.log(data);
  timerElement.innerHTML = data.time;
  quarterElement.innerHTML = 'PERIODE ' + data.quarter;
});

alert("Commands:\n\n<Space> Start/Stop\n<Backspace> Reset period\n<Shift><Backspace> Reset clock\n<+> Add 1 second\n<Shift><+> Add 10 seconds\n<-> Remove 1 second\n<Shift><-> Remove 10 seconds");

document.addEventListener("keydown", function(event){
    if (event.key === " "){
      socket.emit('command', 'toggle');
    } else if (event.key === "Backspace") {
      if (event.shiftKey){
        console.log("Resetting clock");
        socket.emit('command', 'resetFull');
        //clock.addSeconds(10);
      } else {
        console.log("Reseting period");
        socket.emit('command', 'reset');
        //clock.addSeconds(1);
      }
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
    } else if (event.key === "h") {
      console.log("Adding home point");
      socket.emit('command', 'addHomeScore');
    } else if (event.key === "H") {
      console.log("Removing home point");
      socket.emit('command', 'removeHomeScore');
    } else if (event.key === "n") {
      console.log("Useing home timeout");
      socket.emit('command', 'useHomeTimeout');
    } else if (event.key === "N") {
      console.log("Reset home timeouts");
      socket.emit('command', 'resetHomeTimeouts');
    } else if (event.key === "a") {
      console.log("Adding away point");
      socket.emit('command', 'addAwayScore');
    } else if (event.key === "A") {
      console.log("Removing away point");
      socket.emit('command', 'removeAwayScore');
    } else if (event.key === "z") {
      console.log("Using away timeout");
      socket.emit('command', 'useAwayTimeout');
    } else if (event.key === "Z") {
      console.log("Reset away timeouts");
      socket.emit('command', 'resetAwayTimeouts');
    }
});
