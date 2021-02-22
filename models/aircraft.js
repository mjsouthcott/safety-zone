const mongoose = require("mongoose");
const categories = require("../utils/aircraft/categories");
const types = require("../utils/aircraft/types");

const Schema = mongoose.Schema;

const aircraftSchema = new Schema(
	{
		category: {
			type: String,
			enum: categories,
			required: true,
		},
		type: {
			type: String,
			enum: types,
			required: true,
		},
		registration: {
			type: String,
			required: true,
			unique: true,
			minlength: 5,
			maxlength: 8,
			trim: true,
		},
		flightSafetyReports: [
			{
				type: Schema.Types.ObjectId,
				ref: "FlightSafetyReport",
			},
		],
		flyingSquadron: {
			type: Schema.Types.ObjectId,
			ref: "FlyingSquadron",
		},
	},
	{
		timestamps: true,
	}
);

const Aircraft = mongoose.model("Aircraft", aircraftSchema);

module.exports = Aircraft;
