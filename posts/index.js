const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

const jsonParser = bodyParser.json()

const posts = [];

app.get('/api/posts' , (req , res) => res.status(200).json({ message : 'success' , data : posts , length : posts.length }));

app.post('/api/posts' , jsonParser ,(req , res) => {
    const { title } = req.body;
    const id = new Date().getTime();
    posts.push( { title , id } );
    res.status(200).json({ message : 'success' , data : { title , id } , length : 1 })
});


const server = app.listen( 8000 );
server.on('listening' , () => {
    console.log("Server listening on 8000");
})