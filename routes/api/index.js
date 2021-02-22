const router = require("express").Router();
const aircraftRoutes = require("./aircraft");
const flightSafetyReportRoutes = require("./flightSafetyReports");
const flyingSquadronRoutes = require("./flyingSquadrons");
const wingRoutes = require("./wings");

router.use("/aircraft", aircraftRoutes);
router.use("/flightSafetyReports", flightSafetyReportRoutes);
router.use("/flyingSquadrons", flyingSquadronRoutes);
router.use("/wings", wingRoutes);

module.exports = router;
