const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let addressSchema = new Schema({
        line1: {type: String, required: true},
        line2: {type: String},
        street: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        country: {type: String, required: true},
        postalCode: {type: String, required: true}
    },
    {
        collection: 'Addresses'
    });

let addressModel = mongoose.model('Addresses', addressSchema);

let userSchema = new Schema({
        firstName: {type: String, required: true, minLength: 3},
        lastName: {type: String, required: true, minLength: 3},
        username: {type: String, required: true, minLength: 5, unique: true},
        pwd: {type: String, required: true},
        email: {
            type: String,
            required: true,
            unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        dob: {type: Date},
        address: {type: Schema.ObjectId, ref: 'Addresses', required: true},
        profileImage: {type: String}
    },
    {
        collection: 'Users'
    });

let userModel = mongoose.model('Users', userSchema);

let chatSchema = new Schema({
        sender: {type: Schema.ObjectId, ref: 'Users', required: true},
        receiver: {type: Schema.ObjectId, ref: 'Users', required: true},
        message: {type: String, required: true}
    },
    {
        collection: 'Chats'
    });

let chatModel = mongoose.model('Chats', chatSchema);

let categorySchema = new Schema(
    {
        category: {type: String, required: true}
    },
    {
        collection: 'Categories'
    }
);

let categoryModel = mongoose.model('Categories', categorySchema);

let productSchema = new Schema({
        username: {type: Schema.ObjectId, ref: 'Users', required: true},
        category: {type: Schema.ObjectId, ref: 'Categories', required: true},
        name: {type: String, required: true},
        description: {type: String},
        price: {type: Number, min: 0, required: true},
        available: {type: Boolean, required: true}
    },
    {
        collection: 'Products'
    });

let productModel = mongoose.model('Products', productSchema);

let productImageSchema = new Schema({
        product: {type: Schema.ObjectId, ref: 'Products', required: true},
        imageURL: {type: String, required: true, unique: true}
    },
    {
        collection: 'ProductImages'
    });

let productImageModel = mongoose.model('ProductImages', productImageSchema);

let commentSchema = new Schema({
        username: {type: Schema.ObjectId, ref: 'Users', required: true},
        product: {type: Schema.ObjectId, ref: 'Products', required: true},
        comment: {type: String},
        rating: {type: Number, min: 0, max: 5}
    },
    {
        collection: 'Comments'
    });

let commentModel = mongoose.model('Comments', commentSchema);

module.exports = {
    addressModel,
    userModel,
    chatModel,
    categoryModel,
    productModel,
    productImageModel,
    commentModel
};
