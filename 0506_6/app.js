const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);

app.get('/',(req,res)=>{
    res.render('html.ejs')
})
app.listen(3000,()=>{
    console.log('Server start!');
})