// Importing the library.
const mongoose = require('mongoose');

// getting Schema class.
const Schema = mongoose.Schema;

// Defining our Schema.
const productSchema = new Schema({
    id         : { type: Number, required: true, unique: true },
    name       : { type: String, required: true },
    quantity   : { type: String, required: true },
    }, 
    { timestamps: true }
);

// Setting up our model.
const productModel  = mongoose.model('products', productSchema);

// Exporting module.
module.exports = productModel;
