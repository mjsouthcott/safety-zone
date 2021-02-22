const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api/1", apiRoutes);

module.exports = router;
