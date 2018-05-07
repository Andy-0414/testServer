const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');

var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: _storage});

app.use(bodyParser.urlencoded({ extended: false })); // POST
app.use(express.static('public')); // PUBLIC STATIC

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);  //EJS

app.get('/upload',(req, res)=>{
    res.render('file_form.ejs');
})
app.post('/upload', upload.single("userfile") , (req, res) => {
    res.send('Clear');
})

app.listen(6974, () => {
    console.log("OPEN SERVER");
})