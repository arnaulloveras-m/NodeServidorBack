//NodeJS: localhost:3080
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const cors = require('cors');

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


io.on('connection', (socket) => {
    console.log('Client conectat correctament');
    socket.emit('listaVideos', videos)
});

app.use(express.static('Videos'));

function generarCodiAleatori() {
    const caracters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codi = '';
    for (let i = 0; i < 4; i++) {
        codi += caracters.charAt(Math.floor(Math.random() * caracters.length));
    }
    return codi;
}

app.post("/codiVideo", (req, res) => {
    generarCodiAleatori();
    console.log(generarCodiAleatori())
})

app.get('/listaVideos', (req, res) => {

});