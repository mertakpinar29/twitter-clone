const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const db = require('monk')(process.env.MONGO_CONNECT);
const twitterposts = db.get('twitterposts');

app.use(express.json());
app.use(cors());


app.get('/tweets',(req,res)=>{
    twitterposts
    .find()
    .then(twits=>{
        res.json(twits);
    });
});

app.get('/', (req,res)=>{
    res.json({
        message: 'selam'
    })
})

app.post('/tweets',(req,res)=>{
    const twit = {
        name:req.body.name.toString(),
        content:req.body.content.toString(),
        created: new Date()
    };

    twitterposts
    .insert(twit)
    .then((createdTwit)=>{
        res.json(createdTwit)
    })
    err => {console.error(err)}
})


app.listen(5000,()=>{
    console.log("5000. portta dinliyor");
})