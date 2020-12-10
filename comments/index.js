const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const axios = require('axios');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

const jsonParser = bodyParser.json()

const commentsByPostId = {};
const eventBusIP = 'event-bus-srv:8005';

app.get('/api/posts/:id/comments' , (req , res) => {
    const comments = commentsByPostId[req.params.id] || [];
    res.status(200).json({ message : 'success' , data : comments , length : comments.length })
});

app.post('/api/posts/:id/comments' , jsonParser , async(req , res) => {
    const { comment } = req.body;
    const id = new Date().getTime();
    const comments = commentsByPostId[req.params.id] || [];
    comments.push( { comment , id } );
    commentsByPostId[req.params.id] = comments;

    await axios.post(`http://${eventBusIP}/api/event` , {type : 'CommentCreated' , message : { comment , id, postId : req.params.id }});
  
    res.status(200).json({ message : 'success' , data : comments , length : comments.length })
});

app.post('/api/event' , jsonParser ,async(req , res) => {
    const { type , message } = req.body;
    console.log("New event recieved" , type , message);
    res.status(200).json({ message : 'success' , data : {type , message} })
});

const server = app.listen( 8001 );
server.on('listening' , () => {
    console.log("Comments Service listening on 8001");
})