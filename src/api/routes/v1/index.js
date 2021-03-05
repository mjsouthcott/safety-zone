const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');

const router = express.Router();

const aircraftRoutes = require('./aircraft');
const flightSafetyReportRoutes = require('./flightSafetyReports');
const flyingSquadronRoutes = require('./flyingSquadrons');
const wingRoutes = require('./wings');

router.use('/aircraft', aircraftRoutes);
router.use('/flightSafetyReports', flightSafetyReportRoutes);
router.use('/flyingSquadrons', flyingSquadronRoutes);
router.use('/users', userRoutes);
router.use('/wings', wingRoutes);

/**
 * GET api/v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET api/v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
