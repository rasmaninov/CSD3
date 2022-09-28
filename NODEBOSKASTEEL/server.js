const express = require('express');
const app = express();

// HTTP Portion
var server = require('http').Server(app);
// Path module
var path = require('path');


// const maxApi = require("./package.json");
// for socketIOclient
  
  const maxApi = require("max-api");

// const ioclient = require('socket.io-client');

 
const io = require('socket.io')(server);
let clients = {};
let sendSocket = {};
// Using the filesystem module
var fs = require('fs');
// http.listen(8080, () => {
//     console.log('server hoort je lul op 3000');
// });

// var server = http.createServer(handleRequest);
server.listen(8080,_ => {
  console.log("Server staat aan!");
});

app.use(express.static(path.join(__dirname,'/')));

app.use(function(req,res,next) {
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.status(400).send("de pagina bestaat niet, sukkel");
});
// // HIER WAS IK
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html'); 
// });

io.on('connection', (socket) => {
  console.log('connected');
  clients[socket.id] = socket;
  console.log("id 1:",socket.id);

  socket.on('phone',data => {
    console.log("id 2:",data);
    sendSocket[data] = clients[data];
  })
  socket.on('disconnect',function(){
    console.log('disconnected');
  })
  socket.on('message', (msg) => {
    io.emit('message', msg)
  })    
});

maxApi.addHandler('message',(msg) => {
  // console.log("message:",msg,sendSocket);
  for (let i in sendSocket) {
    console.log(i);
    sendSocket[i].emit('message',msg);
  }
  
});     


// console.log('Server started on port 8080');

// function handleRequest(req, res) {
//   // What did we request?
//   var pathname = req.url;
//   console.log('piemels');

//   // If blank let's ask for index.html
//   if (pathname == '/') {
//     pathname = '/index.html';
//   }

//   // Ok what's our file extension
//   var ext = path.extname(pathname);

//   // Map extension to file type
//   var typeExt = {
//     '.html': 'text/html',
//     '.js':   'text/javascript',
//     '.css':  'text/css'
//   };
//   // What is it?  Default to plain text

//   var contentType = typeExt[ext] || 'text/plain';

//   // User file system module
//   fs.readFile(__dirname + pathname,
//     // Callback function for reading
//     function (err, data) {
//       // if there is an error
//       if (err) {
//         res.writeHead(500);
//         return res.end('Error loading ' + pathname);
//       }
//       // Otherwise, send the data, the contents of the file
//       res.writeHead(200,{ 'Content-Type': contentType });
//       res.end(data);
//     }
//   );
// }

