const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'topic'
});

app.use(bodyParser.urlencoded({ extended: false })); // POST
app.use(express.static('public')); // ./public folder

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/topic/new', (req, res) => {
    var sql = 'SELECT id,title FROM list';
    conn.query(sql, (err, rows, fields) => {
        res.render('new', {
            topics: rows
        });
    })
}) // NEW LIST

app.post('/topic/new', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;

    var sql = 'INSERT INTO list (title,description,author) VALUES(?,?,?)'
    conn.query(sql, [title, description, author], (err, rows, fields) => {
        if (err) { console.log(err); }
        else {
            res.redirect('/topic/' + rows.insertId);
        }
    });
}); //NEW LIST POST

app.get('/topic/:id/edit', (req, res) => {
    var sql = 'SELECT id,title FROM list';
    conn.query(sql, (err, rows, fields) => {
        var id = req.params.id
        if (id) {
            var sql = 'SELECT * FROM list WHERE id=?'
            conn.query(sql, [id], (err, row, fields) => {
                if (err) { console.log(err); }
                else {
                    res.render('edit', {
                        topics: rows, topic: row[0]
                    });
                }
            })
        }
        else {
            console.log(err);
        }
    })
}); //EDIT LIST

app.post('/topic/:id/edit', (req, res) => {
    var title = req.body.title;

    var description = req.body.description;
    var author = req.body.author;
    var id = req.params.id;
    var sql = 'UPDATE list SET title=?, description=?, author=? WHERE id=?';
    conn.query(sql, [title, description, author, id], (err, rows, fields) => {
        if (err) { console.log(err); }
        else {
            res.redirect('/topic/' + id);
        }
    });
}); //EDIT LIST POST


app.get(['/topic', '/topic/:id'], (req, res) => {
    var sql = 'SELECT id,title FROM list';
    conn.query(sql, (err, rows, fields) => {
        var id = req.params.id
        if (id) {
            var sql = 'SELECT * FROM list WHERE id=?'
            conn.query(sql, [id], (err, row, fields) => {
                if (err) { console.log(err); }
                else {
                    res.render('view', {
                        topics: rows, topic: row[0]
                    });
                }
            })
        }
        else {
            res.render('view.jade', {
                topics: rows, topic: ''
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Server OPEN');
});