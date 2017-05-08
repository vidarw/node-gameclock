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
    if (cmd === 'reset') clock.resetPeriod();
    if (cmd === 'resetFull') clock.resetFull();
    if (cmd === 'addOne') clock.addTime(1);
    if (cmd === 'addTen') clock.addTime(10);
    if (cmd === 'removeOne') clock.addTime(-1);
    if (cmd === 'removeTen') clock.addTime(-10);
    if (cmd === 'addHomeScore') clock.addHomeScore(1);
    if (cmd === 'removeHomeScore') clock.addHomeScore(-1);
    if (cmd === 'useHomeTimeout') clock.useHomeTimeout();
    if (cmd === 'resetHomeTimeouts') clock.setHomeTimeouts(3);
    if (cmd === 'addAwayScore') clock.addAwayScore(1);
    if (cmd === 'removeAwayScore') clock.addAwayScore(-1);
    if (cmd === 'useAwayTimeout') clock.useAwayTimeout();
    if (cmd === 'resetAwayTimeouts') clock.setAwayTimeouts(3);
  });
});





server.listen(port);
