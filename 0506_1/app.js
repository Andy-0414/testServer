const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/',(req, res) =>{
    res.send('hello?');
    console.log('Conneted User!');
});
app.get('/hos', (req, res) => {
    res.send('<img src="./hos.png">');
    console.log('login try!');
});
 
app.listen(3000,() =>{
    console.log('Conneted 3000 port!');
})