const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    desc: String,
    image: String,
 
});

const Product = mongoose.model('product',ProductSchema);
module.exports = Product;
