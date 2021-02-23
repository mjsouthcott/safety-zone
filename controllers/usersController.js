const db = require("../models");

module.exports = {
	findOneById: function (req, res) {
		db.User.findById(req.params.id)
			.then((user) => {
				res.json(user);
			})
			.catch((err) => {
				res.status(422).json(err);
			});
	},
};
