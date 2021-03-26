const { Double } = require('bson');
const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    for_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    for_business: { type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    in_cart: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
        quantity: Number   
    }],
    discount: Number,
    total_price: Number,
    scheduled_purchasing: {
        scheduled_purchasing_on: Boolean,
        purchase_time: {
            /* How many times a month to reorder */
            frequency: Number,
            /* What day to reorder ex: 1st and 15th */
            reorder_days: [Number],
            /* Reorder ONLY if below certain number of in-stock to prevent overstocking */
            max_number_instock_reorder: Number
        }
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;