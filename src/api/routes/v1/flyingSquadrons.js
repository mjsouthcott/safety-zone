const router = require('express').Router();
const flyingSquadronsController = require('../../controllers/flyingSquadronsController');

router.route('/').get(flyingSquadronsController.findAll);

module.exports = router;
