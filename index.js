const express = require('express');

const app = express();

app.set('view engine', 'ejs');

const homeRouter = require('./routes/home');
const productRouter = require('./routes/product');
const bukuRouter = require('./routes/buku');
const penerbitRouter = require('./routes/penerbit');

const sequelize = require('./configs/sequelize');

const Product = require('./models/product');
const Buku = require('./models/buku');
const Penerbit = require('./models/penerbit');

app.use(homeRouter);
app.use('/product', productRouter);
app.use('/buku', bukuRouter);
app.use('/penerbit', penerbitRouter);

app.listen(3000, () => {
    console.log('server started');
    sequelize.sync();
})