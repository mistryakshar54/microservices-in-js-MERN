const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const axios = require('axios');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

const jsonParser = bodyParser.json()

app.post('/api/event' , jsonParser ,async(req , res) => {
    const { type , message } = req.body;
    console.log("New event recieved" , type , message);
    res.status(200).json({ message : 'success' , data : {type , message} })
});


const server = app.listen( 8002 );
server.on('listening' , () => {
    console.log("Query Service listening on 8002");
})