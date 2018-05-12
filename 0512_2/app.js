const express = require('express');
const cookieParser = require('cookie-parser');// npm install cookie-parser --save
const app = express();
app.use(cookieParser(''));

var list = {
    1: { title: 'Hello' },
    2: { title: 'world!' }
}
app.get('/list', (req, res) => {
    var out = '';
    for (var num in list) {
        out += `
        <li>
            <a href="/cart/${num}">${list[num].title}</a>
        </li>`;
    }
    res.send(`<h1>MAIN</h1><ul>${out}</ul><a href="/cart">Cart</a>`);
})

app.get('/cart', (req, res) => {
    var cart = req.cookies.cart;
    var out = '';
    if(!cart){
        res.send('Empty!');
    }
    else{
        for(var num in cart){
            out += `<li>${list[num].title} (${cart[num]})</li>`
        }
    }
    res.send(`<ul>${out}</ul><a href="/list">List</a>`);
})

app.get('/cart/:id', (req, res) => {
    var id = req.params.id;
    var cart = req.cookies.cart;
    if (!cart) {
        cart = {};
    }
    if (!cart[id]) {
        cart[id] = 0;
    }
    cart[id] = parseInt(cart[id]) + 1;
    res.cookie('cart', cart);
    res.redirect('/cart');
})

app.listen(3000, () => {
    console.log('Server Open')
})