const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

const jsonParser = bodyParser.json()

const commentsByPostId = {};

app.get('/api/posts/:id/comments' , (req , res) => {
    const comments = commentsByPostId[req.params.id] || [];
    res.status(200).json({ message : 'success' , data : comments , length : comments.length })
});

app.post('/api/posts/:id/comments' , jsonParser ,(req , res) => {
    const { comment } = req.body;
    const id = new Date().getTime();
    const comments = commentsByPostId[req.params.id] || [];
    comments.push( { comment , id } );
    commentsByPostId[req.params.id] = comments;
    res.status(200).json({ message : 'success' , data : comments , length : comments.length })
});


const server = app.listen( 8001 );
server.on('listening' , () => {
    console.log("Server listening on 8001");
})