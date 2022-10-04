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
  if (IP > 0){
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
  socket.on('scale1', (msg) => {
    io.emit('scale1', msg)
  })  
  
  socket.on('scale2', (msg) => {
    io.emit('scale2', msg)
  }) 

  socket.on('scale3', (msg) => {
    io.emit('scale3', msg)
  })  
  
  socket.on('scale4', (msg) => {
    io.emit('scale4', msg)
  }) 
});

maxApi.addHandler('scale1',(msg) => {
  // console.log("message:",msg,sendSocket);
  for (let i in sendSocket) {
    console.log(i);
    sendSocket[i].emit('scale1',msg);
    // sendSocket[i].emit('poepje',msg);
  }
});    

maxApi.addHandler('scale2',(msg) => {
  for (let i in sendSocket) {
    sendSocket[i].emit('scale2',msg);
  }
}); 

maxApi.addHandler('scale3',(msg) => {
  for (let i in sendSocket) {
    sendSocket[i].emit('scale3',msg);
  }
}); 

maxApi.addHandler('scale4',(msg) => {
  for (let i in sendSocket) {
    sendSocket[i].emit('scale4',msg);
  }
}); 
