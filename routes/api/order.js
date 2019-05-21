const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/order.controller');

router.post('/:id/confirm', orderController.confirm);
router.post('/:id/new', orderController.new);
router.put('/:id', orderController.update);
router.delete('/:id', orderController.cancel);

module.exports = router;





