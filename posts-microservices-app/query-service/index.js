const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const axios = require('axios');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

const jsonParser = bodyParser.json()

const posts = {};
const eventBusIP = 'event-bus-srv:8005';

const handleEvents = (type , message) => {
    switch( type ){
        case 'PostCreated' : {
            posts[message.id] = message;
            break;
        }
        case 'CommentCreated' : {
            let comments = posts[message.postId].comments || [];
            comments.push({ comment : message.comment , id: message.id });
            posts[message.postId].comments = comments;
            break;
        }
    }
}

app.post('/api/event' , jsonParser ,async(req , res) => {
    const { type , message } = req.body;
    handleEvents( type, message );
    console.log("New event recieved" , type , message);
    res.status(200).json({ message : 'success' , data : {type , message} })
});

app.get('/api/posts' , (req , res) => res.status(200).json({ message : 'success' , data : posts , length : posts.length }));

const server = app.listen( 8002 );
server.on('listening' , async() => {
    console.log("Query Service listening on 8002");
    const {data} = await axios.get(`http://${eventBusIP}/api/event`);
    const { eventLogs } = data;
    console.log("eventLogs", eventLogs)
    eventLogs.forEach( log => {
        handleEvents( log.type, log.message );
    });
})