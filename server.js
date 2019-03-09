const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');
const path = require('path');


//require('events').EventEmitter.prototype._maxListeners = 0;



app.get('/', function(req,res){
	res.sendFile(__dirname + '/client.html');
});

var chunks =[];

io.on('connection', function(socket){
	fs.readdir('./pics', (err,files)=>{ 
		if(err){
			console.log(err);
		};
		
		files.forEach(function(file){
			fs.readFile('./pics/'+file,(err,data) => {
				var file =data.toString('base64');
				chunks.push[file];
			});
		})

		
			setInterval(function(){
				
				socket.emit('img-chunk', chunks);
				//console.log(i);
			},5000);
			// if(index == files.length){
			// 	clearInterval(emitInterval);
			// }
		
			
	});
})

// io.on('connection', function(socket){
// 	var chunk = [];
// 	fs.readFile(__dirname + '/pic1.jpg', (err, data) =>{
// 		if(err) throw err;
// 		chunk.push(data.toString('base64'));
// 		socket.emit('img-chunk', chunk);
// 	});
// 	console.log(chunk);
// });





// io.on('connection', function(socket){
// 	var readStream = fs.createReadStream(path.resolve(__dirname, './pic1.jpg'), {encoding : 'binary'});
// 	var chunks =[];
// 	var delay = 0;

// 	readStream.on('readable',() => {
// 		console.log('Image Loading....');
// 	});

// 	readStream.on('data', (chunk) => {
// 		chunks.push(chunk);
// 		console.log(chunks);
// 		delay =delay +5000;
// 		setTimeOut(() => {
// 			socket.emit('img-chunk', chunk);
// 		}, delay);
// 	});

// 	readStream.on('end', ()=>{
// 		console.log('end');
// 	})
// });


const port =3000;
server.listen(port,() => {console.log('server is running at port '+ port)});
