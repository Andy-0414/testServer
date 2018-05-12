const express = require('express');
const cookieParser = require('cookie-parser');// npm install cookie-parser --save
const app = express();
app.use(cookieParser('Andy0414'));

app.get('/count', (req, res) => {
    var c = parseInt(req.signedCookies.count);
    if (!c) {
        c = 1;
    }
    else {
        c++;
    }
    res.cookie('count', c, { signed: true });
    res.send('count : ' + c);
})

app.listen(3000, () => {
    console.log('Server Open')
})