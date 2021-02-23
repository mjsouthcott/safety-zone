const db = require("../models");

module.exports = {
	findAll: function (req, res) {
		db.FlyingSquadron.find(req.query)
			.select("title")
			.then((flyingSquadrons) => {
				res.json(flyingSquadrons);
			})
			.catch((err) => {
				res.status(422).json(err);
			});
	},
};
