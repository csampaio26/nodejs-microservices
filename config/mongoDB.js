const connectionStringClient = process.env.MONGO_CONNECTION_CLIENT;
const connectionStringOrder = process.env.MONGO_CONNECTION_ORDER;
const mongoose = require('mongoose');

function connect () {
    mongoose.client_conn = mongoose.createConnection(connectionStringClient, { useNewUrlParser: true });
    mongoose.order_conn = mongoose.createConnection(connectionStringOrder, { useNewUrlParser: true });
}

module.exports = {
    mongoose,
    connect
};
