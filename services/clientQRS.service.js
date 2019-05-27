const orderRepository = require('../repository/order.repository');
const logRepository = require('../repository/logClient.repository');

exports.getAll = async (res) => {
    await logRepository.newQRS("Orders returned.");
    const all = await orderRepository.getAll();
    res.status(202).send(all);
};

