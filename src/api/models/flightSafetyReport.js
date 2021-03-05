const mongoose = require('mongoose');
const additionalOccurrenceTypes = require('../utils/flight_safety_report/additionalOccurrenceTypes');
const aircraftDamageLevels = require('../utils/flight_safety_report/aircraftDamageLevels');
const birdstrikeBirdSizeClassifications = require('../utils/flight_safety_report/birdstrikeBirdSizeClassifications');
const birdstrikeCategories = require('../utils/flight_safety_report/birdstrikeCategories');
const birdstrikeDamageTypes = require('../utils/flight_safety_report/birdstrikeDamageTypes');
const birdstrikeFlightDisruptionOptions = require('../utils/flight_safety_report/birdstrikeFlightDisruptionOptions');
const birdstrikeLightsOnOptions = require('../utils/flight_safety_report/birdstrikeLightsOnOptions');
const birdstrikeNOTAMWarningOptions = require('../utils/flight_safety_report/birdstrikeNOTAMWarningOptions');
const birdstrikePartsStruckOptions = require('../utils/flight_safety_report/birdstrikePartsStruckOptions');
const cf140FiledOptions = require('../utils/flight_safety_report/cf140FiledOptions');
const occurrenceTypes = require('../utils/flight_safety_report/occurrenceTypes');
const personnelCasualtyLevels = require('../utils/flight_safety_report/personnelCasualtyLevels');
const safetyOfFlightCompromiseLevels = require('../utils/flight_safety_report/safetyOfFlightCompromiseLevels');
const statuses = require('../utils/flight_safety_report/statuses');

const { Schema } = mongoose;

const flightSafetyReportSchema = new Schema(
  {
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    occurrenceType: {
      type: String,
      enum: occurrenceTypes,
    },
    additionalOccurrenceTypes: [
      {
        type: String,
        enum: additionalOccurrenceTypes,
      },
    ],
    cf140Filed: {
      type: String,
      enum: cf140FiledOptions,
    },
    personnelCasualtyLevel: {
      type: String,
      enum: personnelCasualtyLevels,
    },
    safetyOfFlightCompromiseLevel: {
      type: String,
      enum: safetyOfFlightCompromiseLevels,
    },
    aircraftDamageLevel: {
      type: String,
      enum: aircraftDamageLevels,
    },
    wingOperatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Wing',
    },
    flyingSquadronOperatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'FlyingSquadron',
    },
    stageOfOperations: {
      type: String,
      // required: true,
      minlength: 2,
      maxlength: 100,
      trim: true,
    },
    altitude: {
      type: Number,
    },
    ias: {
      type: Number,
    },
    missionType: {
      type: String,
      // required: true,
      minlength: 2,
      maxlength: 100,
      trim: true,
    },
    barrierEngaged: {
      type: Boolean,
    },
    occurrenceLocation: {
      type: String,
      // required: true,
      minlength: 2,
      maxlength: 100,
      trim: true,
    },
    navaidLocationIdent: {
      type: Number,
    },
    navaidLocationDistanceTo: {
      type: Number,
    },
    navaidLocationBearingTo: {
      type: Number,
    },
    descriptionTitle: {
      type: String,
      // required: true,
      minlength: 5,
      maxlength: 100,
      trim: true,
    },
    descriptionNarrative: {
      type: String,
      // required: true,
      minlength: 5,
      maxlength: 100,
      trim: true,
    },
    personnel: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Personnel',
      },
    ],
    weather: {
      type: String,
      // required: true,
      minlength: 2,
      maxlength: 100,
      trim: true,
    },
    lightConditions: {
      type: String,
      // required: true,
      minlength: 2,
      maxlength: 100,
      trim: true,
    },
    cloud: {
      type: String,
      // required: true,
      minlength: 2,
      maxlength: 100,
      trim: true,
    },
    visibility: {
      type: Number,
    },
    windSpeed: {
      type: Number,
    },
    windDirection: {
      type: Number,
    },
    birdstrikeCategory: {
      type: String,
      enum: birdstrikeCategories,
    },
    birdstrikeRemainsSubmitted: {
      type: Boolean,
    },
    birdstrikeWithin5NMOfAirport: {
      type: Boolean,
    },
    birdstrikeFlightDisruption: {
      type: String,
      enum: birdstrikeFlightDisruptionOptions,
    },
    birdstrikeNOTAMWarning: {
      type: String,
      enum: birdstrikeNOTAMWarningOptions,
    },
    birdstrikeLightsOn: {
      type: String,
      enum: birdstrikeLightsOnOptions,
    },
    birdstrikePartsStruck: [
      {
        type: String,
        enum: birdstrikePartsStruckOptions,
      },
    ],
    birdstrikeDamageType: {
      type: String,
      enum: birdstrikeDamageTypes,
    },
    birdstrikeBirdSpecies: {
      type: String,
      // required: true,
      minlength: 2,
      maxlength: 100,
      trim: true,
    },
    birdstrikeBirdQuantity: {
      type: Number,
    },
    birdstrikeBirdSizeClassification: {
      type: String,
      enum: birdstrikeBirdSizeClassifications,
    },
    status: {
      type: String,
      enum: statuses,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    aircraft: {
      type: Schema.Types.ObjectId,
      ref: 'Aircraft',
    },
  },
  {
    timestamps: true,
  },
);

const FlightSafetyReport = mongoose.model(
  'FlightSafetyReport',
  flightSafetyReportSchema,
);

module.exports = FlightSafetyReport;
