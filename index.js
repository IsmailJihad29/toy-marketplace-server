const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000

// middleware 
app.use(express.json())
app.use(cors())



app.get('/', (req, res) => { 
    res.send('Figlandia Server Is running ')
})



app.listen(port, () => {
    console.log(`Figladia Server is listening on ${port}`)
})