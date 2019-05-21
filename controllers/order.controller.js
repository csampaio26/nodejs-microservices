const orderService = require('../services/order.service');

exports.new = async(req, res) => {
    try {
        const data = await orderService.new(req.params.id, req.body);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to confirm new order.'+ e
        });
    }
};

exports.update = async(req, res) => {
    try {
        const data = await orderService.update(req.params.id, req.body);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to confirm new order.'+ e
        });
    }
};

exports.confirm = async(req, res) => {
    try {
        req.body.status='confirmed';
        const data = await orderService.confirm(req.params.id, req.body);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to confirm new order.'+ e
        });
    }
};

exports.cancel = async(req, res) => {
    try {
        const data = await orderService.cancel(req.params.id, req.body);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to confirm new order.'+ e
        });
    }
};
