const express = require('express');
const router = express.Router();

router.use('/api', require('./api'));

router.get('/', function(req, res, next) {
    res.render('index', { title: 'NodeJS Microservices' });
});

module.exports = router;
