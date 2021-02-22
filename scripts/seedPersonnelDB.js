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

const personnelSeed = [
	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 *	Flying Squadron: 1 (404 Long Range Patrol and Training Squadron)
	 * 	Aircraft: 1 (CP-140 Aurora/GW-0000)
	 * 	Flight Safety Report: 2 (Failed tire during landing)
	 *	Personnel: 1 (Captain)
	 */
	{
		role: "Captain",
		mosid: "00183: PLT",
		onboard: true, // boolean
		injury: "Whiplash",
	},

	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 *	Flying Squadron: 1 (404 Long Range Patrol and Training Squadron)
	 * 	Aircraft: 1 (CP-140 Aurora/GW-0000)
	 * 	Flight Safety Report: 2 (Failed tire during landing)
	 *	Personnel: 2 (First Officer)
	 */
	{
		role: "First Officer",
		mosid: "00183: PLT",
		onboard: true, // boolean
		injury: "Whiplash",
	},

	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 *	Flying Squadron: 1 (404 Long Range Patrol and Training Squadron)
	 * 	Aircraft: 1 (CP-140 Aurora/GW-0000)
	 * 	Flight Safety Report: 2 (Failed tire during landing)
	 *	Personnel: 3 (Air Combat Systems Officer)
	 */
	{
		role: "Air Combat Systems Officer",
		mosid: "00182: ACSO",
		onboard: true, // boolean
		injury: "Bruised shoulder",
	},

	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 *	Flying Squadron: 1 (404 Long Range Patrol and Training Squadron)
	 * 	Aircraft: 1 (CP-140 Aurora/GW-0000)
	 * 	Flight Safety Report: 2 (Failed tire during landing)
	 *	Personnel: 4 (Passenger)
	 */
	{
		role: "Passenger",
		mosid: "00187: EME",
		onboard: true, // boolean
		injury: "Concussion",
	},
];

db.Personnel.insertMany(personnelSeed).then((personnel) => {
	console.log(`${personnel.length} Personnel records inserted!`);
	process.exit(0);
});
