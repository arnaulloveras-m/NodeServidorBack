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
