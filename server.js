var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

var GameClock = require('./gameclock');
var display = '88:88';

// Routing
app.use(express.static(__dirname + '/app'));

var clock = new GameClock("12:00", function(clock) {
  if (clock.time !== display){
    display = clock.time;
    io.emit('update', clock);
    console.log(display);
  }
}, function(quarter){
  console.log('NEW QUARTER! CHANGE PLACES!', quarter);
  clock.stop();
}, function(quarter){
  console.log('HALFTIME! TAKE A BREAK!', quarter);
  clock.stop();
}, function(quarter){
  console.log('GAME ENDED!');
  clock.stop();
});


io.on('connection', function(socket){ /* … */
  console.log('new client', socket);

  socket.on('command', function(cmd){
    console.log('command', cmd);
    if (cmd === 'toggle') clock.toggle();
    if (cmd === 'reset') clock.reset();
    if (cmd === 'addOne') clock.addSeconds(1);
    if (cmd === 'addTen') clock.addSeconds(10);
    if (cmd === 'removeOne') clock.addSeconds(-1);
    if (cmd === 'removeTen') clock.addSeconds(-10);
  });
});





server.listen(port);
