//NodeJS: localhost:3080
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
port = 3080;
app.listen(port, () => {
    console.log(__dirname)
    console.log(`El servidor escolta per el port:: ${port}`)
})

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