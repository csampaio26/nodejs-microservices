const express = require('express');
const router = express.Router();
const transportController = require('../../controllers/transport.controller');

router.post('/:id/delivering', transportController.delivering);
router.post('/:id/delivered', transportController.delivered);

module.exports = router;





