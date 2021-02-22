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

const aircraftSeed = [
	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 *	Flying Squadron: 1 (404 Long Range Patrol and Training Squadron)
	 * 	Aircraft: 1 (CP-140 Aurora/GW-0000)
	 */
	{
		category: "Maritime Aviation",
		type: "CP-140 Aurora",
		registration: "GW-0000",
	},

	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 *	Flying Squadron: 1 (404 Long Range Patrol and Training Squadron)
	 * 	Aircraft: 2 (CP-140 Aurora/GW-0001)
	 */
	{
		category: "Maritime Aviation",
		type: "CP-140 Aurora",
		registration: "GW-0001",
	},

	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 *	Flying Squadron: 1 (404 Long Range Patrol and Training Squadron)
	 * 	Aircraft: 3 (CP-140 Aurora/GW-0002)
	 */
	{
		category: "Maritime Aviation",
		type: "CP-140 Aurora",
		registration: "GW-0002",
	},

	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 *	Flying Squadron: 2 (405 Long Range Patrol Squadron)
	 * 	Aircraft: 4 (CP-140 Aurora/GW-0003)
	 */
	{
		category: "Maritime Aviation",
		type: "CP-140 Aurora",
		registration: "GW-0003",
	},

	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 *	Flying Squadron: 2 (405 Long Range Patrol Squadron)
	 * 	Aircraft: 5 (CP-140 Aurora/GW-0004)
	 */
	{
		category: "Maritime Aviation",
		type: "CP-140 Aurora",
		registration: "GW-0004",
	},

	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 *	Flying Squadron: 2 (405 Long Range Patrol Squadron)
	 * 	Aircraft: 6 (CP-140 Aurora/GW-0005)
	 */
	{
		category: "Maritime Aviation",
		type: "CP-140 Aurora",
		registration: "GW-0005",
	},

	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 *	Flying Squadron: 3 (413 Transport and Rescue Squadron)
	 *	Aircraft: 7 (CC-130H Hercules/GW-0006)
	 */
	{
		category: "Transport",
		type: "CC-130H Hercules",
		registration: "GW-0006",
	},

	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 *	Flying Squadron: 3 (413 Transport and Rescue Squadron)
	 *	Aircraft: 8 (CC-130H Hercules/GW-0007)
	 */
	{
		category: "Search and Rescue",
		type: "CH-149 Cormorant",
		registration: "GW-0007",
	},

	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 *	Flying Squadron: 3 (413 Transport and Rescue Squadron)
	 *	Aircraft: 9 (CC-130H Hercules/GW-0008)
	 */
	{
		category: "Search and Rescue",
		type: "CH-149 Cormorant",
		registration: "GW-0008",
	},

	/*
	 *	Wing: 2 (19 Wing Comox)
	 *	Flying Squadron: 4 (407 Long Range Patrol Squadron)
	 *	Aircraft: 10 (CP-140 Aurora/CX-0000)
	 */
	{
		category: "Maritime Aviation",
		type: "CP-140 Aurora",
		registration: "CX-0000",
	},

	/*
	 *	Wing: 2 (19 Wing Comox)
	 *	Flying Squadron: 4 (407 Long Range Patrol Squadron)
	 *	Aircraft: 11 (CP-140 Aurora/CX-0001)
	 */
	{
		category: "Maritime Aviation",
		type: "CP-140 Aurora",
		registration: "CX-0001",
	},

	/*
	 *	Wing: 2 (19 Wing Comox)
	 *	Flying Squadron: 4 (407 Long Range Patrol Squadron)
	 *	Aircraft: 12 (CP-140 Aurora/CX-0002)
	 */
	{
		category: "Maritime Aviation",
		type: "CP-140 Aurora",
		registration: "CX-0002",
	},

	/*
	 *	Wing: 2 (19 Wing Comox)
	 *	Flying Squadron: 5 (418 Search and Rescue Operational Training Squadron)
	 *	Aircraft: 13 (CC-295 Kingfisher/CX-0003)
	 */
	{
		category: "Search and Rescue",
		type: "CC-295 Kingfisher",
		registration: "CX-0003",
	},

	/*
	 *	Wing: 2 (19 Wing Comox)
	 *	Flying Squadron: 5 (418 Search and Rescue Operational Training Squadron)
	 *	Aircraft: 14 (CC-295 Kingfisher/CX-0004)
	 */
	{
		category: "Search and Rescue",
		type: "CC-295 Kingfisher",
		registration: "CX-0004",
	},

	/*
	 *	Wing: 2 (19 Wing Comox)
	 *	Flying Squadron: 5 (418 Search and Rescue Operational Training Squadron)
	 *	Aircraft: 15 (CC-295 Kingfisher/CX-0005)
	 */
	{
		category: "Search and Rescue",
		type: "CC-295 Kingfisher",
		registration: "CX-0005",
	},

	/*
	 *	Wing: 2 (19 Wing Comox)
	 *	Flying Squadron: 6 (442 Transport and Rescue Squadron)
	 *	Aircraft: 16 (CC-115 Buffalo/CX-0006)
	 */
	{
		category: "Search and Rescue",
		type: "CC-115 Buffalo",
		registration: "CX-0006",
	},

	/*
	 *	Wing: 2 (19 Wing Comox)
	 *	Flying Squadron: 6 (442 Transport and Rescue Squadron)
	 *	Aircraft: 17 (CC-115 Buffalo/CX-0007)
	 */
	{
		category: "Search and Rescue",
		type: "CH-149 Cormorant",
		registration: "CX-0007",
	},

	/*
	 *	Wing: 2 (19 Wing Comox)
	 *	Flying Squadron: 6 (442 Transport and Rescue Squadron)
	 *	Aircraft: 18 (CC-115 Buffalo/CX-0008)
	 */
	{
		category: "Search and Rescue",
		type: "CH-149 Cormorant",
		registration: "CX-0008",
	},

	/*
	 *	Wing: 3 (4 Wing Cold Lake)
	 *	Flying Squadron: 7 (401 Tactical Fighter Squadron)
	 *	Aircraft: 19 (CF-188 Hornet/CL-0000)
	 */
	{
		category: "Fighter",
		type: "CF-188 Hornet",
		registration: "CL-0000",
	},

	/*
	 *	Wing: 3 (4 Wing Cold Lake)
	 *	Flying Squadron: 7 (401 Tactical Fighter Squadron)
	 *	Aircraft: 20 (CF-188 Hornet/CL-0001)
	 */
	{
		category: "Fighter",
		type: "CF-188 Hornet",
		registration: "CL-0001",
	},

	/*
	 *	Wing: 3 (4 Wing Cold Lake)
	 *	Flying Squadron: 7 (401 Tactical Fighter Squadron)
	 *	Aircraft: 21 (CF-188 Hornet/CL-0002)
	 */
	{
		category: "Fighter",
		type: "CF-188 Hornet",
		registration: "CL-0002",
	},

	/*
	 *	Wing: 3 (4 Wing Cold Lake)
	 *	Flying Squadron: 8 (409 Tactical Fighter Squadron)
	 *	Aircraft: 22 (CF-188 Hornet/CL-0003)
	 */
	{
		category: "Fighter",
		type: "CF-188 Hornet",
		registration: "CL-0003",
	},

	/*
	 *	Wing: 3 (4 Wing Cold Lake)
	 *	Flying Squadron: 8 (409 Tactical Fighter Squadron)
	 *	Aircraft: 23 (CF-188 Hornet/CL-0004)
	 */
	{
		category: "Fighter",
		type: "CF-188 Hornet",
		registration: "CL-0004",
	},

	/*
	 *	Wing: 3 (4 Wing Cold Lake)
	 *	Flying Squadron: 8 (409 Tactical Fighter Squadron)
	 *	Aircraft: 24 (CF-188 Hornet/CL-0005)
	 */
	{
		category: "Fighter",
		type: "CF-188 Hornet",
		registration: "CL-0005",
	},

	/*
	 *	Wing: 3 (4 Wing Cold Lake)
	 *	Flying Squadron: 9 (410 Tactical Fighter Operational Training Squadron)
	 *	Aircraft: 25 (CF-188 Hornet/CL-0006)
	 */
	{
		category: "Fighter",
		type: "CF-188 Hornet",
		registration: "CL-0006",
	},

	/*
	 *	Wing: 3 (4 Wing Cold Lake)
	 *	Flying Squadron: 9 (410 Tactical Fighter Operational Training Squadron)
	 *	Aircraft: 26 (CF-188 Hornet/CL-0007)
	 */
	{
		category: "Fighter",
		type: "CF-188 Hornet",
		registration: "CL-0007",
	},

	/*
	 *	Wing: 3 (4 Wing Cold Lake)
	 *	Flying Squadron: 9 (410 Tactical Fighter Operational Training Squadron)
	 *	Aircraft: 27 (CF-188 Hornet/CL-0008)
	 */
	{
		category: "Fighter",
		type: "CF-188 Hornet",
		registration: "CL-0008",
	},
];
db.Aircraft.insertMany(aircraftSeed).then((aircraft) => {
	console.log(`${aircraft.length} Aircraft records inserted!`);
	process.exit(0);
});
