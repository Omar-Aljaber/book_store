const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductDescription = new Schema({
    content: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    pagesCount: {
        type: Number
    },
    height: {
        type: Number
    },
    width: {
        type: Number
    },
    typeOfCover: {
        type: String
    }
});

const ProductImage = new Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
});


const ProductSchema = new Schema({
    image: [
        ProductImage
    ],
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    dateOfPublish: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    review: {
        type: Number,
    },
    view: {
        type: Number,
    },
    description: [
        ProductDescription  
    ],
    created_at: {
        type: Date,
        default: Date.now
    }
});


const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
