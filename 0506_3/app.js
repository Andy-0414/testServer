const express = require('express');
const app = express();
app.set('view engine','jade');
app.set('views','./views');

app.use(express.static('public'));

app.get('/template',(req,res)=>{
    res.render('temp',{
        time:Date(),
        title:'JADE'
    });
})

app.listen(3000,()=>{
    console.log('Server open!');
})