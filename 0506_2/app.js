const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/',(req, res) => {
    console.log("try");
    var list = ''
    for(var i = 0;i<5;i++)
    {
        list += '<li>Hello World</li>'
    }
    var out = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>hello</title>
</head>
<body>
    hello server
    <ul>
    ${list}
    </ul>
</body>
</html>
    `
    res.send(out);
})

app.listen(3000, () => {
    console.log('Conneted 3000 port!');
})