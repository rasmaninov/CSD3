const express = require('express');
const app = express();

// HTTP Portion
var server = require('http').Server(app);
// Path module
var path = require('path');

// voor de connectie met MAX
const maxApi = require("max-api");
 
// include socket
const io = require('socket.io')(server);

// maak array met data voor apperaten die verbinden
let clients = {};

let all_divices = {};
var IP = 0;

// maak een array met de IP addressen die van alle apperaten binnen komt
// hiermee kunnen we onderscheiden van verschillende apperaten
let sendSocket = {};
// Using the filesystem module
var fs = require('fs');

// server luistert
server.listen(8080,_ => {
  console.log("Server staat aan!");
});

// functie voor de paden van de includes in de Iindex.html
app.use(express.static(path.join(__dirname,'/')));

//  maak een URL aan voor de pagina als deze bestaat
app.use(function(req,res,next) {
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.status(400).send("de pagina bestaat niet, sukkel");
});

// maak connectie met sockets
io.on('connection', (socket) => {
  console.log('connected');
  clients[socket.id] = socket;
  console.log("id 1:",socket.id);

  all_divices[IP] = socket.id;
  IP = IP + 1;
  if (IP > 1){
    IP = 0;
  }
  socket.emit('phoneIDs', all_divices);
  console.log("all IDs",all_divices);

  socket.on('phone',data => {
    console.log("id 2:",data);
    sendSocket[data] = clients[data];
  })

  
  socket.on('disconnect',function(){
    console.log('disconnected');
  })

  // messages van sockets
  socket.on('message', (msg) => {
    // console.log('ip' , msg);
    io.emit('message', msg)
  })  
  
  socket.on('poepje', (msg) => {
    io.emit('poepje', msg)
  }) 

});

maxApi.addHandler('message',(msg) => {
  // console.log("message:",msg,sendSocket);
  for (let i in sendSocket) {
    console.log(i);
    sendSocket[i].emit('message',msg);
    // sendSocket[i].emit('poepje',msg);
  }
});    

maxApi.addHandler('poepje',(msg) => {
  // console.log("message:",msg,sendSocket);
  for (let i in sendSocket) {
    // console.log(i);
    sendSocket[i].emit('poepje',msg);
    // sendSocket[i].emit('poepje',msg);
  }
}); 

function wrap(val){
  if (val > 7){
    val = 0
  }
}