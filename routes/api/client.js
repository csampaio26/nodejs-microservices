const express = require('express');
const router = express.Router();
const clientController = require('../../controllers/client.controller')

router.post('/new', clientController.new);
router.delete('/:id', clientController.cancel);
router.put('/:id', clientController.update);
router.get('/', clientController.getAll);

module.exports = router;
