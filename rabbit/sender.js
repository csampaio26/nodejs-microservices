const amqp = require('amqplib/callback_api');

exports.send = (EXCHANGE_NAME, orderDTO, operation, sender) => {

    amqp.connect('amqp://localhost', function(error0, connection) {
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

            channel.publish(EXCHANGE_NAME, '', Buffer.from(JSON.stringify(orderDTO)));

            console.log(` [x] ${sender} Sent: Order ${operation} `);

            setTimeout(function() {
                connection.close();
            }, 500);
        });
    });

}
