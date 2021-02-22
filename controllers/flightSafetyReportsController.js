const mongoose = require("mongoose");
const db = require("../models");

module.exports = {
	findAll: function (req, res) {
		db.Aircraft.find({
			flightSafetyReports: { $exists: true, $ne: [] },
		})
			.select(["type", "registration"])
			.populate({
				path: "flightSafetyReports",
				select: [
					"date",
					"time",
					"occurrenceType",
					"additionalOccurrenceTypes",
					"descriptionTitle",
					"status",
				],
			})
			.then((aircraft) => {
				res.json(aircraft);
			})
			.catch((err) => res.status(422).json(err));
	},
	findAllByStatus: function (req, res) {
		db.Aircraft.find({
			flightSafetyReports: { $exists: true, $ne: [] },
		})
			.select(["type", "registration"])
			.populate({
				path: "flightSafetyReports",
				match: { status: req.params.status }, // have to change to req.query
				select: [
					"date",
					"time",
					"occurrenceType",
					"additionalOccurrenceTypes",
					"descriptionTitle",
					"status",
				],
			})
			.then((aircraft) => {
				res.json(
					aircraft.filter(
						(aircraft) => aircraft.flightSafetyReports.length !== 0
					)
				);
			})
			.catch((err) => res.status(422).json(err));
	},
	findOneById: function (req, res) {
		db.Aircraft.find({
			flightSafetyReports: { $exists: true, $ne: [] },
		})
			.select(["type", "registration"])
			.populate({
				path: "flightSafetyReports",
				match: { _id: req.params.id },
				populate: {
					path: "personnel",
				},
			})
			.then((aircraft) => {
				res.json(
					aircraft.filter(
						(aircraft) => aircraft.flightSafetyReports.length !== 0
					)
				);
			})
			.catch((err) => res.status(422).json(err));
	},
};
