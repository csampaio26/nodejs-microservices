const transportService = require('../services/transport.service');

exports.delivering = async(req, res) => {
    try {
        const data = await transportService.deliver(req.params.id, req.body, res);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to begin delivering new order.'+ e
        });
    }
};

exports.delivered = async(req, res) => {
    try {
        await transportService.delivered(req.params.id, req.body, res);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to deliver new order.'+ e
        });
    }
};
