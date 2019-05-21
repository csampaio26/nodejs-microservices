const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const OrderSchema = new Schema({
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    status:  { type: String, default: 'created' },
    ingredients: {type: String, max: 200}
});

const clientOrder = mongoose.client_conn.model('Order', OrderSchema);
const orderOrder = mongoose.order_conn.model('Order', OrderSchema);

module.exports = {
    clientOrder,
    orderOrder
};
