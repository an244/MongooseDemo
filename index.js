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

//setup route cho upload file
const upload = require ('./uploadConfig.js');
app.post('/add', upload.single('image'), (req,res)=> {
const {name,desc} = req.body;

//neu co file up len thi lay ten file, con ko co thi dat ten la default de luu trog db
const image = req.file ? req.file.filename : 'default.jpg';
const product = new Product({name,desc,image});

//Luu du lieu cua product vao database, sau do redirect lai home.
product.save()
.then(()=> res.redirect('/'))
.catch(err => res.send(err.message));
});