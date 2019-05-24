const clientQRSService = require('../services/clientQRS.service')
const clientCRSService = require('../services/clientCRS.service')

exports.new = async(req, res, next) => {
    try {
        const data = await clientCRSService.new(req.body);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to create new order.'+ e
        });
    }
}

exports.update = async(req, res, next) => {
    try {
        const data = await clientCRSService.update(req.params.id, req.body);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to update order.'+ e
        });
    }
}

exports.cancel = async(req, res, next) => {
    try {
        const data = await clientCRSService.cancel(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to delete order.'+ e
        });
    }
}

exports.getAll = async(req, res, next) => {
    try {
        const data = await clientQRSService.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to get orders.'+ e
        });
    }
}
