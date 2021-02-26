const aircraft = require('./aircraft');
const flightSafetyReport = require('./flightSafetyReport');
const flyingSquadron = require('./flyingSquadron');
const personnel = require('./personnel');
const user = require('./user.model');
const wing = require('./wing');

module.exports = {
  Aircraft: aircraft,
  FlightSafetyReport: flightSafetyReport,
  FlyingSquadron: flyingSquadron,
  Personnel: personnel,
  User: user,
  Wing: wing,
};
