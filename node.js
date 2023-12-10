//NodeJS: localhost:3080
const {Server} = require("socket.io");
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');


const app = express();
const server = http.createServer(app);
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
var videoData;
var videoEscollit;

io.on('connection', (socket) => {
    console.log('Client conectat correctament');
    socket.emit('listaVideos', videos)

    socket.on('videoEscollit', (res)=>{
        videoEscollit = res.video
        console.log(videoEscollit)
    })
    socket.emit('codeFromServer', { code: randomCode() });

    socket.on('sendCode', (res) =>{
        if (res.toString() === codi){
            var videoFilePath;
            if ("Cara al Sol Remix" === videoEscollit){
                videoFilePath = 'Videos/cara al sol remix.mp4';
            } else if ("Churumbel de Malaga" === videoEscollit){
                videoFilePath = 'Videos/Churumbel de Malaga Veniros Todos para la Playa (Video).mp4';
            } else if("Mandanga Style" === videoEscollit){
                videoFilePath = 'Videos/Mandanga Style - DJ Theo  Amador.mp4';
            } else if("Varela" === videoEscollit){
                videoFilePath = 'Videos/VARELA - YASMINA [VIDEO OFICIAL].mp4';
            }

            videoData = fs.readFileSync(videoFilePath);
            console.log("Els codis son iguals, pots veure el video")

        } else {
            console.log("Els codis nos son iguals.")
        }
    })
    socket.emit('serverResponse', { status: 'correcte', video: videoData });

});

app.use(express.static('Videos'));

