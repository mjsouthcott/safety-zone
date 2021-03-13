const mongoose = require('mongoose');
const mosids = require('../utils/mosids');

const { Schema } = mongoose;

const personnelSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      trim: true,
    },
    mosid: {
      type: String,
      enum: mosids,
      required: true,
    },
    onboard: {
      type: Boolean,
      default: true,
    },
    injury: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      trim: true,
    },
    flightSafetyReport: {
      type: Schema.Types.ObjectId,
      ref: 'FlightSafetyReport',
    },
  },
  {
    timestamps: true,
  },
);

const Personnel = mongoose.model('Personnel', personnelSchema);

module.exports = Personnel;
