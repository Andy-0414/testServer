const express = require('express');
const session = require('express-session'); // npm install express-session --save

const app = express();
app.use(session({
    secret: 'Andy0414',
    resave: false,
    saveUninitialized: true
}));

app.get('/count', (req, res) => {
    var c = req.session.count;
    if(!c)
    {
        c = 0;
    }
    c++
    req.session.count = c;
    res.send("count : "+c);
})

app.listen(3000, () => {
    console.log('Server OPEN');
})