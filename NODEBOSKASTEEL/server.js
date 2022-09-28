const app = require('express')();
// HTTP Portion
var http = require('http').Server(app);
// Path module
var path = require('path');
const io = require('socket.io')(http);

// Using the filesystem module
var fs = require('fs');

// // HIER WAS IK
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); 
});

io.on('connection', (socket) => {
  console.log('connected');
  io.on('disconnect',function(){
    console.log('disconnected');
  })
  io.on('message', (msg) => {
    io.emit('message', msg)
  })    
});
    
http.listen(8080, () => {
    console.log('server hoort je lul op 3000');
});

console.log('Server started on port 8080');

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
