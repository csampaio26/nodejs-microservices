const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Hello From INSIS service'));
router.use('/client', require('./client'));
router.use('/order', require('./order'));

module.exports = router;
