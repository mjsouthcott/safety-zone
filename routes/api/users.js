const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router.route("/:id").get(usersController.findOneById);

module.exports = router;
