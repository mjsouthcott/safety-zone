const mongoose = require("mongoose");
const db = require("../models");

// get environment variables
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || 27017;
const dbUsername = process.env.DB_USER || "";
const dbPassword = process.env.DB_PASS || "";

// connect to db
const dbAuth = dbUsername && dbPassword ? `${dbUsername}:${dbPassword}@` : "";
mongoose.connect(`mongodb://${dbAuth}${dbHost}:${dbPort}/test`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const wingSeed = [
	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 */
	{
		title: "14 Wing Greenwood",
		flyingSquadrons: [],
	},

	/*
	 *	Wing: 2 (19 Wing Comox)
	 */
	{
		title: "19 Wing Comox",
		flyingSquadrons: [],
	},

	/*
	 *	Wing: 3 (4 Wing Cold Lake)
	 */
	{
		title: "4 Wing Cold Lake",
		flyingSquadrons: [],
	},
];
db.FlyingSquadron.find().then((flyingSquadrons) => {
	let idx = 0;
	for (i = 0; i < wingSeed.length; i++) {
		for (j = 0; j < flyingSquadrons.length / wingSeed.length; j++) {
			wingSeed[i].flyingSquadrons.push(flyingSquadrons[idx]._id);
			idx++;
		}
	}
	db.Wing.insertMany(wingSeed).then((wings) => {
		console.log(`${wings.length} Wing records inserted!`);
		let idx = 0;
		for (i = 0; i < wings.length; i++) {
			for (j = 0; j < flyingSquadrons.length / wings.length; j++) {
				wingSeed[i].flyingSquadrons.push(flyingSquadrons[idx]._id);
				flyingSquadrons[idx].wing = wings[i]._id;
				idx++;
			}
		}
		db.FlyingSquadron.collection
			.bulkWrite(
				flyingSquadrons.map((flyingSquadron) => ({
					updateOne: {
						filter: {
							_id: flyingSquadron._id,
						},
						update: {
							$set: flyingSquadron,
						},
					},
				}))
			)
			.then(() => {
				process.exit(0);
			});
	});
});
