const amqp = require('amqplib/callback_api');
const logOrder = require('../repository/logOrder.repository');
const logClient = require('../repository/logClient.repository');
const logTransport = require('../repository/logTransport.repository');


exports.clientReceiver = () => {
    amqp.connect(process.env.MESSAGE_QUEUE, function(error0, connection) {
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

                    channel.consume(q.queue, async function(msg) {
                        if(msg.content) {
                            console.log(` [x] Client received: ${ msg.content.toString() } `);
                            await logClient.newQRS(msg.content.toString())
                            await logClient.newCRS(msg.content.toString())
                        }
                    }, {
                        noAck: true
                    });
                });
            }
        });
    });
}

exports.orderReceiver = () => {
    amqp.connect(process.env.MESSAGE_QUEUE, function(error0, connection) {
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

                    channel.consume(q.queue, async function(msg) {
                        if(msg.content) {
                            console.log(` [x] Order received: ${ msg.content.toString() } `);
                            await logOrder.new(msg.content.toString())
                        }
                    }, {
                        noAck: true
                    });
                });
            }
        });
    });
}

exports.transportReceiver = () => {
    amqp.connect(process.env.MESSAGE_QUEUE, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            const subscribedExchanges = ['Kitchen'];

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
                    console.log(` [*] Transport waiting for messages in %s. To exit press CTRL+C`, q.queue);

                    channel.bindQueue(q.queue, subscribedExchanges[i], '');

                    channel.consume(q.queue, async function(msg) {
                        if(msg.content) {
                            console.log(` [x] Transport received: ${ msg.content.toString() } `);
                            await logTransport.new(msg.content.toString())
                        }
                    }, {
                        noAck: true
                    });
                });
            }
        });
    });
}
