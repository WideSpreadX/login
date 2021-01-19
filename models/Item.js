const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({
    for_company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    name: String,
    description: String,
    sku: String,
    make: /* {type: mongoose.Schema.Types.ObjectId, ref: 'Company'} */String,
    model: String,
    year: String,
    price: Number,
    color1: String,
    color2: String,
    dimensions: {
        width: Number,
        height: Number,
        depth: Number
    },
    weight: Number,
    category: String,
    supplier_website: String,
    product_webpage: String,
    total: Number,
    need: Number
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;