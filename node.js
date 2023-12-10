//NodeJS: localhost:3080
const {Server} = require("socket.io");
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
//const io = socketIO(server);
const io = new Server(7777);

const randomstring = require('randomstring');

const cors = require('cors');
const socket = require("nodemon");


app.use(cors());
app.use(express.json());
port = 3080;

server.listen(port, () => {
    console.log(`Servidor escoltant amb el port:  ${port}`);
});


var videos = [
    { Video1: 'Cara al Sol Remix' },
    { Video2: 'Churumbel de Malaga' },
    { Video3: 'Mandanga Style' },
    { Video4: 'Varela' }
];

var codi = "";

function randomCode(){
    codi = randomstring.generate({
        length: 4,
        charset: 'alphanumeric',
    });

    return codi
}


io.on('connection', (socket) => {
    console.log('Client conectat correctament');
    socket.emit('listaVideos', videos)
    socket.on("verifyCode", (res)=>{
        console.log(res)
    })
    socket.emit('codeFromServer', { code: randomCode() });
});

app.use(express.static('Videos'));

