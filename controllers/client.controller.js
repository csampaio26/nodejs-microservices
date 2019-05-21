const clientService = require('../services/client.service')

exports.new = async(req, res, next) => {
    try {
        const data = await clientService.new(req.body);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to create new order.'+ e
        });
    }
}

exports.update = async(req, res, next) => {
    try {
        const data = await clientService.update(req.params.id, req.body);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to update order.'+ e
        });
    }
}

exports.cancel = async(req, res, next) => {
    try {
        const data = await clientService.cancel(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to delete order.'+ e
        });
    }
}
