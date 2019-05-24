const amqp = require('amqplib/callback_api');

exports.send = (EXCHANGE_NAME, message) => {

    amqp.connect(process.env.MESSAGE_QUEUE, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            channel.assertExchange(EXCHANGE_NAME, 'fanout', {
                durable: false
            });

            channel.publish(EXCHANGE_NAME, '', Buffer.from(message));

            console.log(` [x] ${EXCHANGE_NAME} Sent: ${message} `);

            setTimeout(function() {
                connection.close();
            }, 500);
        });
    });

}
