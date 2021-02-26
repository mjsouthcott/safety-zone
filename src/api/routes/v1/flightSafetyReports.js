const router = require('express').Router();
const flightSafetyReportsController = require('../../controllers/flightSafetyReportsController');

router.route('/').get(flightSafetyReportsController.findAll);

router.route('/:id').get(flightSafetyReportsController.findOneById);

module.exports = router;
