const clientQRSService = require('../services/clientQRS.service')
const clientCRSService = require('../services/clientCRS.service')

exports.new = async(req, res, next) => {
    try {
         await clientCRSService.new(req.body, res);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to create new order.'+ e
        });
    }
}

exports.update = async(req, res, next) => {
    try {
         await clientCRSService.update(req.params.id, req.body, res);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to update order.'+ e
        });
    }
}

exports.cancel = async(req, res, next) => {
    try {
       await clientCRSService.cancel(req.params.id, res);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to delete order.'+ e
        });
    }
}

exports.getAll = async(req, res, next) => {
    try {
        await clientQRSService.getAll(res);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to get orders.'+ e
        });
    }
}
