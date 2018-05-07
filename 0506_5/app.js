const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({  extended: false}));
app.use(express.static('public'));

app.get('/',(req, res)=>{
    res.sendFile(__dirname+'/html.html');
})

app.get('/getData',(req, res) =>{
    var title = req.query.title;
    var name = req.query.name;
    res.send(`Hello GET ${name} title:${title}`);
})
app.post('/getData',(req, res) =>{
    var title = req.body.title;
    var name = req.body.name;
    res.send(`Hello POST ${name} title:${title}`);
})


app.get('/q/:id', (req, res) => {

    res.send(req.params.id);
})

app.get('/q/:id/:mode', (req, res) => {
    res.send(req.params.id+' + '+req.params.mode);
})


app.listen(3000, () => {
    console.log('Server open!');
})