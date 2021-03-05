const router = require('express').Router();
const wingsController = require('../../controllers/wingsController');

router.route('/').get(wingsController.findAll);

module.exports = router;
