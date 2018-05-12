var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'o2'
});
conn.connect();
// var sql = 'SElECT * FROM topic'
// conn.query(sql, (err, rows, fields) => {
//     if(err)
//     {
//         console.log(err);
//     }
//     else{
//         for(var i = 0; i < rows.length; i++){
//             console.log(rows[i].title);
//         }
//     }
// });
var sql = 'INSERT INTO topic (title, description, author) VALUES(?,?,?)';
var params = ['title', 'con', 'user'];
conn.query(sql, params, (err, rows, fields) => {
    if (err) {
        console.log(err);
    }
    console.log(rows);
})
conn.end();