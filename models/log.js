const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const client_log_conn_qrs = process.env.MONGO_CONN_CLIENT_LOG_QRS;
const client_log_conn_crs = process.env.MONGO_CONN_CLIENT_LOG_CRS;
const order_log_conn = process.env.MONGO_CONN_ORDER_LOG;

const LogSchema = new Schema({
    log: {type: String, max: 100},
    created: { type: Date, default: Date.now }
});

const client_qrs_log = mongoose.client_qrs_log = mongoose.createConnection(client_log_conn_qrs, { useNewUrlParser: true });
const client_crs_log = mongoose.client_crs_log = mongoose.createConnection(client_log_conn_crs, { useNewUrlParser: true });
const orders_log = mongoose.orders_log = mongoose.createConnection(order_log_conn, { useNewUrlParser: true });

const clientCrsLog = client_qrs_log.model('Log', LogSchema);
const clientQrsLog = client_crs_log.model('Log', LogSchema);
const orderLog = orders_log.model('Log', LogSchema);

module.exports = {
    clientCrsLog,
    clientQrsLog,
    orderLog
};
