const mongoose = require("mongoose");
const mosids = require("../utils/mosids");
const ranks = require("../utils/user/ranks");
const types = require("../utils/user/types");

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		type: {
			type: String,
			enum: types,
			required: true,
		},
		rank: {
			type: String,
			enum: ranks,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 30,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 30,
			trim: true,
		},
		mosid: {
			type: String,
			enum: mosids,
			required: true,
		},
		office: {
			type: String,
			// required: true,
			minlength: 2,
			maxlength: 30,
			trim: true,
		},
		telephoneNumber: {
			type: String,
			// required: true,
			minlength: 10,
			maxlength: 14,
			trim: true,
		},
		emailAddress: {
			type: String,
			required: true,
			unique: true,
			minlength: 6,
			maxlength: 30,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
			maxlength: 20,
			trim: true,
		},
		flightSafetyReports: [
			{
				type: Schema.Types.ObjectId,
				ref: "FlightSafetyReport",
			},
		],
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
