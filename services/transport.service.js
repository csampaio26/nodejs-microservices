const rabbitSender = require('../rabbit/sender');
const EXCHANGE_NAME = "Transport";
const orderRepository = require('../repository/order.repository');
const logRepository = require('../repository/logTransport.repository');

exports.deliver = async (id, body, res) => {
    const order = await orderRepository.get(id);
    if(order.status == "cooked" ) {
        const newLog = await logRepository.new(`Order delivering :${id}.`);

        await orderRepository.delivering(id, body)

        rabbitSender.send(EXCHANGE_NAME, newLog.log);
        res.status(202).send(newLog.log);
    } else {
        res.status(400).send(`Cant begin delivery an order when its ${order.status}`);
    }
};

exports.delivered = async (id, body, res) => {
    const order = await orderRepository.get(id);
    if(order.status == "delivering" ) {
        const newLog = await logRepository.new(`Order delivered :${id}.`);

        await orderRepository.delivered(id, body)

        rabbitSender.send(EXCHANGE_NAME, newLog.log);
        res.status(202).send(newLog.log);
    } else {
        res.status(400).send(`Cant deliver an order when its ${order.status}`);
    }
};
