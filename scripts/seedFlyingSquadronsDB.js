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

const flyingSquadronSeed = [
	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 *	Flying Squadron: 1 (404 Long Range Patrol and Training Squadron)
	 */
	{
		title: "404 Long Range Patrol and Training Squadron",
		aircraft: [],
	},

	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 *	Flying Squadron: 2 (405 Long Range Patrol Squadron)
	 */
	{
		title: "405 Long Range Patrol Squadron",
		aircraft: [],
	},

	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 *	Flying Squadron: 3 (413 Transport and Rescue Squadron)
	 */
	{
		title: "413 Transport and Rescue Squadron",
		aircraft: [],
	},

	/*
	 *	Wing: 2 (19 Wing Comox)
	 *	Flying Squadron: 4 (407 Long Range Patrol Squadron)
	 */
	{
		title: "407 Long Range Patrol Squadron",
		aircraft: [],
	},

	/*
	 *	Wing: 2 (19 Wing Comox)
	 *	Flying Squadron: 5 (418 Search and Rescue Operational Training Squadron)
	 */
	{
		title: "418 Search and Rescue Operational Training Squadron",
		aircraft: [],
	},

	/*
	 *	Wing: 2 (19 Wing Comox)
	 *	Flying Squadron: 6 (442 Transport and Rescue Squadron)
	 */
	{
		title: "442 Transport and Rescue Squadron",
		aircraft: [],
	},

	/*
	 *	Wing: 3 (4 Wing Cold Lake)
	 *	Flying Squadron: 7 (401 Tactical Fighter Squadron)
	 */
	{
		title: "401 Tactical Fighter Squadron",
		aircraft: [],
	},

	/*
	 *	Wing: 3 (4 Wing Cold Lake)
	 *	Flying Squadron: 8 (409 Tactical Fighter Squadron)
	 */
	{
		title: "409 Tactical Fighter Squadron",
		aircraft: [],
	},

	/*
	 *	Wing: 3 (4 Wing Cold Lake)
	 *	Flying Squadron: 9 (410 Tactical Fighter Operational Training Squadron)
	 */
	{
		title: "410 Tactical Fighter Operational Training Squadron",
		aircraft: [],
	},
];
db.Aircraft.find().then((aircraft) => {
	let idx = 0;
	for (let i = 0; i < flyingSquadronSeed.length; i++) {
		for (let j = 0; j < aircraft.length / flyingSquadronSeed.length; j++) {
			flyingSquadronSeed[i].aircraft.push(aircraft[idx]._id);
			idx++;
		}
	}
	db.FlyingSquadron.insertMany(flyingSquadronSeed).then((flyingSquadrons) => {
		console.log(
			`${flyingSquadrons.length} FlyingSquadron records inserted!`
		);
		db.Aircraft.find().then((aircraft) => {
			let idx = 0;
			for (let i = 0; i < flyingSquadrons.length; i++) {
				for (
					let j = 0;
					j < aircraft.length / flyingSquadrons.length;
					j++
				) {
					aircraft[idx].flyingSquadron = flyingSquadrons[i]._id;
					idx++;
				}
			}
			db.Aircraft.collection
				.bulkWrite(
					aircraft.map((aircraft) => ({
						updateOne: {
							filter: {
								_id: aircraft._id,
							},
							update: {
								$set: aircraft,
							},
						},
					}))
				)
				.then(() => {
					process.exit(0);
				});
		});
	});
});
