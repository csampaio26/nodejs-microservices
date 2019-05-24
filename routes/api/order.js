const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/order.controller');

router.post('/:id/confirm', orderController.confirm);

module.exports = router;





