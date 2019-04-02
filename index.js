var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){


  console.log('a Chad connected');
  socket.on('disconnect', function(){
    console.log('a loser disconnected');
    for(var x = 0; x < users.length; x++){
    	if(socket.nick == users[x]){
    		users.splice(x,1);
    	}
    }
    io.emit('updateUsers', users);
    io.emit('chat message', socket.nick + ' Left')


  });


  socket.on('chat message', function(msg){
  	console.log(socket.nick+' wrote: '+msg);
  	io.emit('chat message',socket.nick+': '+msg);
  });
  socket.on('chosenName', function(name){
  	socket.nick = name;
  	io.emit('chat message', socket.nick + ' joined');
  	users.push(socket.nick);
  	io.emit('updateUsers', users);
  	console.log(users);
  });
});


app.get('/fioiHhHuhuHUyIUtyutttYRUYryterTYoIGygJhiUYytfghjutyrUYYTyYtRrYguITyGYUtyHGYtUIgYgGayyyy', function(req,res){
	res.sendFile(__dirname + '/chat.html')
})
app.get('/*', function(req,res){
	window.location.href = "google.com";
})

app.get('/*',function(req,res){
	res.write('You are very much unwelcome here D:');
	res.end();
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});