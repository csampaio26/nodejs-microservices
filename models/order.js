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

const orders_conn = process.env.MONGO_CONN_ORDERS;

const orders = mongoose.createConnection(orders_conn, { useNewUrlParser: true });

const Order = orders.model('Order', OrderSchema);

module.exports = Order;
