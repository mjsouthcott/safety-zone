const db = require("../models");

module.exports = {
	findAll: function (req, res) {
		db.Wing.find(req.query)
			.select("title")
			.then((wings) => {
				res.json(wings);
			})
			.catch((err) => res.status(422).json(err));
	},
};
