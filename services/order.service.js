const rabbitSender = require('../rabbit/sender');
const EXCHANGE_NAME = "Order";
const orderRepository = require('../repository/order.repository');
const logRepository = require('../repository/logOrder.repository');

exports.confirm = async (id, body) => {
    const newLog = await logRepository.new("Order confirmed.");

    await orderRepository.confirm(id, body)

    rabbitSender.send(EXCHANGE_NAME, newLog.log  );
};
