const rabbitSender = require('../rabbit/sender');
const EXCHANGE_NAME = "Client";
const orderRepository = require('../repository/order.repository');
const logRepository = require('../repository/logClient.repository');


exports.new = async (body) => {
    const newLog = await logRepository.newCRS("Order created.");

    await orderRepository.new(body);

    rabbitSender.send(EXCHANGE_NAME, newLog.log  );
};

exports.cancel = async (id) => {
    const newLog = await logRepository.newCRS("Order deleted.");

    await orderRepository.delete(id);

    rabbitSender.send(EXCHANGE_NAME, newLog.log  );
};

exports.update = async (id, body) => {
    const newLog = await logRepository.newCRS("Order updated.");

    await orderRepository.update(id, body);

    rabbitSender.send(EXCHANGE_NAME, newLog.log  );
};

