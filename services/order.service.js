const amqp = require('amqplib/callback_api');
const orderDTO = require('../dto/order.dto');
const rabbitSender = require('../rabbit/sender');
const EXCHANGE_NAME = "Order";
const orderRepository = require('../repository/orderOrder.repository');
const axios = require('axios');

exports.confirm = async (id, body) => {
    const newOrder = await orderRepository.update(id, body);
    const newOrderDTO = await orderDTO(newOrder, "confirmed", "order");

    rabbitSender.send(EXCHANGE_NAME,newOrderDTO,"confirmed", "order" );
};

exports.new = async (id, body) => {
    const newOrder = await orderRepository.new(id, body);
    const newOrderDTO = await orderDTO(newOrder, "created", "order");

    rabbitSender.send(EXCHANGE_NAME,newOrderDTO,"created", "order" );
};

exports.cancel = async (id) => {
    const deletedOrder = await orderRepository.delete(id);
    const deletedOrderDTO = await orderDTO(deletedOrder, "delete","order");

    rabbitSender.send(EXCHANGE_NAME,deletedOrderDTO,"deleted", "order" );
};

exports.update = async (id, body) => {
    const order = await orderRepository.update(id, body);
    const updatedOrderDTO = await orderDTO(order, "update","order");

    rabbitSender.send(EXCHANGE_NAME,updatedOrderDTO,"updated", "order" );
};

function listenForResults() {

    amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            const subscribedExchanges = ['Client', 'Stock', 'Kitchen', 'Transport'];

            for(let i = 0; i < subscribedExchanges.length; i++){
                channel.assertExchange(subscribedExchanges[i], 'fanout', {
                    durable: false
                });

                channel.assertQueue('', {
                    exclusive: true
                }, function(error2, q) {
                    if (error2) {
                        throw error2;
                    }
                    console.log(` [*] Order waiting for messages in %s. To exit press CTRL+C`, q.queue);

                    channel.bindQueue(q.queue, subscribedExchanges[i], '');

                    channel.consume(q.queue, function(msg) {
                        if(msg.content) {
                            const varJSON = JSON.parse(msg.content.toString());
                            console.log(" [x] Order received: $s => %s", varJSON['operation'], varJSON['order']['_id']);
                            if(varJSON['sender'] == 'client') {
                                switch (varJSON['operation']) {
                                    case 'create':
                                        axios.post(`http://localhost:8765/api/order/${varJSON['order']['_id']}/new`, varJSON['order'])
                                            .then(function (response) {})
                                            .catch(function (error) {
                                                console.log(error);
                                            });

                                        break;
                                    case 'update':
                                        axios.put(`http://localhost:8765/api/order/${varJSON['order']['_id']}`, varJSON['order'])
                                            .then(function (response) {})
                                            .catch(function (error) {
                                                console.log(error);
                                            });

                                        break;
                                    case 'delete':
                                        axios.delete(`http://localhost:8765/api/order/${varJSON['order']['_id']}`, varJSON['order'])
                                            .then(function (response) {})
                                            .catch(function (error) {
                                                console.log(error);
                                            });

                                        break;
                                }
                            }
                        }
                    }, {
                        noAck: true
                    });
                });
            }
        });
    });

}

// listen for results on RabbitMQ
listenForResults();
