const mongoose = require("mongoose");
const db = require("../models");

// connect to db
mongoose.connect("mongodb://localhost:27017/test", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const userSeed = [
	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 *	Flying Squadron: 1 (404 Long Range Patrol and Training Squadron)
	 * 	Aircraft: 1 (CP-140 Aurora/GW-0000)
	 * 	Flight Safety Report: 1 (Birdstrike during takeoff)
	 *  User: 1 (Reporter)
	 */
	{
		type: "Reporter",
		rank: "Capt / Lt(N)",
		firstName: "Liam",
		lastName: "Smith",
		mosid: "00183: PLT",
		office: "101-111 Rhine Rd",
		telephoneNumber: "555-111-11111",
		emailAddress: "lsmith@forces.gc.ca",
		password: "password",
		flightSafetyReports: [],
	},

	/*
	 *	Wing: 1 (14 Wing Greenwood)
	 *	Flying Squadron: 1 (404 Long Range Patrol and Training Squadron)
	 * 	Aircraft: 1 (CP-140 Aurora/GW-0000)
	 * 	Flight Safety Report: 2 (Failed tire during landing)
	 *  User: 2 (Reporter)
	 */
	{
		type: "Reporter",
		rank: "Lt / SLt",
		firstName: "Olivia",
		lastName: "Brown",
		mosid: "00183: PLT",
		office: "102-222 Ubique Ave",
		telephoneNumber: "555-222-2222",
		emailAddress: "obrown@forces.gc.ca",
		password: "password",
		flightSafetyReports: [],
	},

	/*
	 *	Wing: 2 (19 Wing Comox)
	 *	Flying Squadron: 5 (418 Search and Rescue Operational Training Squadron)
	 *	Aircraft: 13 (CC-295 Kingfisher/CX-0003)
	 *	Flight Safety Report: 3 (Metal deposited in oil filters)
	 *  User: 3 (Reporter)
	 */
	{
		type: "Reporter",
		rank: "MCpl / MS",
		firstName: "Noah",
		lastName: "Tremblay",
		mosid: "00135: AVN TECH",
		office: "103-333 Churchill Ave",
		telephoneNumber: "555-333-3333",
		emailAddress: "ntremblay@forces.gc.ca",
		password: "password",
		flightSafetyReports: [],
	},

	/*
	 *   User: 4 (Investigator)
	 */
	{
		type: "Investigator",
		rank: "Civ",
		firstName: "Emma",
		lastName: "Martin",
		mosid: "N/A",
		office: "104-444 Korea Rd",
		telephoneNumber: "555-444-4444",
		emailAddress: "emartin@forces.gc.ca",
		password: "password",
		flightSafetyReports: [],
	},

	/*
	 *   User: 5 (Administrator)
	 */
	{
		type: "Administrator",
		rank: "Civ",
		firstName: "Oliver",
		lastName: "Roy",
		mosid: "N/A",
		office: "105-555 Mons Ave",
		telephoneNumber: "555-555-5555",
		emailAddress: "oroy@forces.gc.ca",
		password: "password",
		flightSafetyReports: [],
	},
];

db.FlightSafetyReport.find()
	.then((flightSafetyReports) => {
		for (let i = 0; i < flightSafetyReports.length; i++) {
			userSeed[i].flightSafetyReports.push(flightSafetyReports[i]._id);
		}
		return userSeed;
	})
	.then((userSeed) => {
		db.User.insertMany(userSeed).then(() => {
			db.User.find()
				.populate("flightSafetyReports")
				.then((users) => {
					// users.forEach((user) => {
					// 	console.log(user.firstName, user.lastName);
					// 	user.flightSafetyReports.forEach(
					// 		(flightSafetyReport) => {
					// 			console.log(
					// 				flightSafetyReport.descriptionTitle
					// 			);
					// 		}
					// 	);
					// });
					console.log(`${users.length} User records inserted!`);
					process.exit(0);
				});
		});
	});
