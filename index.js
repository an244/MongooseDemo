//server express
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static('public'));

//Mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const uri = 'mongodb://localhost/shopMongoose';
mongoose.connect(uri,{useMongoClient:true});
mongoose.connection
.once('open', ()=> {app.listen(3000,()=>console.log('Server started'))})
.on('error', console.error.bind(console, 'Warning Error:'));

//routing home
const Product = require('./Product');
app.get('/',(req,res)=> {
Product.find({})
.then(products => res.render('home',{products}))//truyen bien products wa home.ejs
});