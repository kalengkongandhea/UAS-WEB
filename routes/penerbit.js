const express = require('express');

const router = express.Router();

const penerbitController = require('../controllers/penerbit');

router.get('/', penerbitController.getIndexPenerbit);

module.exports = router;