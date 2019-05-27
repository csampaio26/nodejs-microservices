const express = require('express');
const router = express.Router();

router.use('/client', require('./client'));
router.use('/order', require('./order'));
router.use('/transport', require('./transport'));

module.exports = router;
