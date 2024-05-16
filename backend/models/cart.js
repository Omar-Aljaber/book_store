const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cartSchema = new Schema({
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: Number
    },
    street: {
        type: String,
        required: true
    },
    home_number: {
        type: Number,
        required: true
    },
    postcode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
