const router = require('express').Router();
const aircraftController = require('../../controllers/aircraftController');

router.route('/').get(aircraftController.findAll);

module.exports = router;
