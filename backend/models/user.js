const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
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

const FavoriteList = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

const WilshList = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

const PurchasesList = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    // lastname: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    // address: [
    //     AddressSchema
    // ],
    // favorite_list: [
    //     FavoriteList
    // ],
    // purchases_list: [
    //     PurchasesList
    // ],
    // wish_list: [
    //     WilshList
    // ],
    created_at: {
        type: Date,
        default: Date.now
    },
});


const User = mongoose.model('User', UserSchema);
module.exports = User;
