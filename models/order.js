const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const OrderSchema = new Schema({
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    status:  { type: String, default: 'created' },
    recipe: {type: String, max: 100},
    date: {type: Date, default: Date.now},
    delivery_place: {type: String, max: 200, default: "Famalicão"},
    service: {type: Boolean, default: true},
    payment: {type: String, default: "MBWay", max: 100}
});

const clientOrder = mongoose.client_conn.model('Order', OrderSchema);
const orderOrder = mongoose.order_conn.model('Order', OrderSchema);

module.exports = {
    clientOrder,
    orderOrder
};
