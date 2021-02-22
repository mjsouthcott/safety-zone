const mongoose = require("mongoose");
const db = require("../models");
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const mongoLogin = process.env.MONGO_USER || '';
const mongoPass = process.env.MONGO_PASS || '';
const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || 27017;

// connect to db
const mongoseAuth = mongoLogin && mongoPass ? `${mongoLogin}:${mongoPass}@` : '';
mongoose.connect(`mongodb://${mongoseAuth}${mongoHost}:${mongoPort}/test`, {
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
db.FlyingSquadron.find()
	.then((flyingSquadron) => {
		let idx = 0;
		for (i = 0; i < wingSeed.length; i++) {
			for (j = 0; j < flyingSquadron.length / wingSeed.length; j++) {
				wingSeed[i].flyingSquadrons.push(flyingSquadron[idx]._id);
				idx++;
			}
		}
		return wingSeed;
	})
	.then((wingSeed) => {
		db.Wing.insertMany(wingSeed).then((wings) => {
			console.log(`${wings.length} Wing records inserted!`);
			process.exit(0);
		});
	});
