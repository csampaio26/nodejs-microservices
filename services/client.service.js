const orderDTO = require('../dto/order.dto');
const rabbitSender = require('../rabbit/sender');
const EXCHANGE_NAME = "Client";
const orderRepository = require('../repository/orderClient.repository');
const amqp = require('amqplib/callback_api');
const axios = require('axios');

exports.new = async (body) => {
    const newOrder = await orderRepository.new(body);
    const newOrderDTO = await orderDTO(newOrder, "create", "client");

    rabbitSender.send(EXCHANGE_NAME,newOrderDTO,"created", "client" );
};

exports.cancel = async (id) => {
    const deletedOrder = await orderRepository.delete(id);
    const deletedOrderDTO = await orderDTO(deletedOrder, "delete","client");

    rabbitSender.send(EXCHANGE_NAME,deletedOrderDTO,"deleted", "client" );
};

exports.update = async (id, body) => {
    const order = await orderRepository.update(id, body);
    const updatedOrderDTO = await orderDTO(order, "update","client");

    rabbitSender.send(EXCHANGE_NAME,updatedOrderDTO,"updated", "client" );
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

            const subscribedExchanges = ['Order', 'Transport'];

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
                    console.log(` [*] Client waiting for messages in %s. To exit press CTRL+C`, q.queue);

                    channel.bindQueue(q.queue, subscribedExchanges[i], '');

                    channel.consume(q.queue, function(msg) {
                        if(msg.content) {
                            const varJSON = JSON.parse(msg.content.toString());
                            switch (varJSON['operation']) {
                                case 'confirmed':
                                    varJSON['order']['status'] = 'confirmed';
                                    axios.put(`http://localhost:8765/api/client/${varJSON['order']['_id']}`, varJSON['order'])
                                        .then(function (response) {})
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                                    console.log(` [*] Client Received: Order confirmed `);
                                    break;
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
