const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const axios = require('axios');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

const jsonParser = bodyParser.json()

const posts = [];

app.get('/api/posts' , (req , res) => res.status(200).json({ message : 'success' , data : posts , length : posts.length }));

app.post('/api/posts' , jsonParser ,async(req , res) => {
    const { title } = req.body;
    const id = new Date().getTime();
    posts.push( { title , id } );
    await axios.post('http://localhost:8005/api/event' , {type : 'PostCreated' , message : { title , id }});
    res.status(200).json({ message : 'success' , data : { title , id } , length : 1 })
});

app.post('/api/event' , jsonParser ,async(req , res) => {
    const { type , message } = req.body;
    console.log("New event recieved" , type , message);
    res.status(200).json({ message : 'success' , data : {type , message} })
});

const server = app.listen( 8000 );
server.on('listening' , () => {
    console.log("Post Service listening on 8000");
})