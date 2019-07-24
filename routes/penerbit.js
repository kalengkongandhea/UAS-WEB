const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const penerbitController = require('../controllers/penerbit');

const auth = require('../configs/auth');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/', penerbitController.getAllPublisher);
router.get('/:penerbit_id', penerbitController.getDetailPublisher);
router.post('/', urlencodedParser, auth.verifyToken, penerbitController.storePublisher);
router.put('/:penerbit_id', urlencodedParser, auth.verifyToken, penerbitController.updatePublisher);
router.delete('/:penerbit_id/destroy', urlencodedParser, auth.verifyToken, penerbitController.destroyPublisher);
router.post('/search/:name', urlencodedParser, penerbitController.searchPublisher);

module.exports = router;