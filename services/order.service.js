const rabbitSender = require('../rabbit/sender');
const EXCHANGE_NAME = "Order";
const orderRepository = require('../repository/order.repository');
const logRepository = require('../repository/logOrder.repository');

exports.confirm = async (id, body, res) => {
    const order = await orderRepository.get(id);
    if(order.status == "updated" || order.status == "created") {
        const newLog = await logRepository.new(`Order confirmed :${id}.`);

        await orderRepository.confirm(id, body)

        rabbitSender.send(EXCHANGE_NAME, newLog.log  );
        res.status(202).send(newLog.log);
    } else {
        res.status(400).send(`Cant confirm an order when its ${order.status}`);
    }
};
