const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);

app.get('/topic/new', (req, res) => {
    res.render('form');
})
app.get(['/topic/:id', '/topic'], (req, res) => {
    fs.readdir('data', (err, files) => {
        if (err) {
            console.log(err);
            res.status(500).send('ERROR!');
        }
        var id = req.params.id;
        if (id) {
            fs.readFile('data/' + id, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('ERROR!');
                }
                res.render('list', {
                    topics: files,
                    title: id,
                    con: data,
                });
            })
        }
        else {
            res.render('list', {
                topics: files,
                title: 'Welcome',
                con: 'Welcome',
            });
        }
    })
})

app.post('/topic', (req, res) => {
    var title = req.body.title;
    var con = req.body.contents;
    fs.writeFile('data/' + title, con, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('ERROR!');
        }
        console.log("Create");
        res.redirect('/topic/' + title);
    });
})

app.get('/', (req, res) => {
    res.redirect('/topic');
})

app.listen(2000, () => {
    console.log('Start Server port: 3000')
})