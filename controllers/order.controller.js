const orderService = require('../services/order.service');

exports.confirm = async(req, res) => {
    try {
        req.body.status='confirmed';
        await orderService.confirm(req.params.id, req.body, res);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to confirm new order.'+ e
        });
    }
};

