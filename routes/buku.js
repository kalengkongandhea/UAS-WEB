const express = require('express');

const router = express.Router();

const bukuController = require('../controllers/buku');

router.get('/', bukuController.getIndexBuku);

module.exports = router;