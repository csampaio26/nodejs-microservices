const orderRepository = require('../repository/order.repository');
const logRepository = require('../repository/logClient.repository');

exports.getAll = async () => {
    await logRepository.newQRS("Orders returned.");
    const all = await orderRepository.getAll();
    return all;
};

