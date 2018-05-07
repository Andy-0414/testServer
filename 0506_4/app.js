const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/q',(req,res)=>{
    var a = `
    <a href='/q?id=0'>id 0</a><br>
    <a href='/q?id=1'>id 1</a><br>
    <a href='/q?id=2'>id 2</a><br>
    ${req.query.id}
    `
    res.send(a);   
})

app.listen(3000, () => {
    console.log('Server open!');
})