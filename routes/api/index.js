const router = require("express").Router();
const aircraftRoutes = require("./aircraft");
const flightSafetyReportRoutes = require("./flightSafetyReports");
const flyingSquadronRoutes = require("./flyingSquadrons");
const userRoutes = require("./users");
const wingRoutes = require("./wings");

router.use("/aircraft", aircraftRoutes);
router.use("/flightSafetyReports", flightSafetyReportRoutes);
router.use("/flyingSquadrons", flyingSquadronRoutes);
router.use("/users", userRoutes);
router.use("/wings", wingRoutes);

module.exports = router;
