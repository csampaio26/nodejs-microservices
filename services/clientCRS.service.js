const rabbitSender = require('../rabbit/sender');
const EXCHANGE_NAME = "Client";
const orderRepository = require('../repository/order.repository');
const logRepository = require('../repository/logClient.repository');

exports.new = async (body, res) => {
    const order =  await orderRepository.new(body);

    const newLog = await logRepository.newCRS(`Order created :${order._id}.`);

    rabbitSender.send(EXCHANGE_NAME, newLog.log);

    res.status(201).send(newLog.log);
};

exports.cancel = async (id, res) => {
    const order = await orderRepository.get(id);
    if(order.status == "updated" || order.status == "created") {
        const newLog = await logRepository.newCRS(`Order deleted :${id}.`);

        await orderRepository.delete(id);

        rabbitSender.send(EXCHANGE_NAME, newLog.log  );
        res.status(202).send(newLog.log);
    } else {
        res.status(400).send(`Cant cancel an order when its ${order.status}`);
    }
};

exports.update = async (id, body, res) => {
    const order = await orderRepository.get(id);
    if(order.status == "updated" || order.status == "created") {
        const newLog = await logRepository.newCRS(`Order updated :${id}.`);

        await orderRepository.update(id, body);

        rabbitSender.send(EXCHANGE_NAME, newLog.log  );
        res.status(202).send(newLog.log);
    } else {
        res.status(400).send(`Cant update an order when its ${order.status}`);
    }
};
