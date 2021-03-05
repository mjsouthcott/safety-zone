const mongoose = require('mongoose');
const { mongo, env } = require('../src/config/vars');

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
mongoose.connect(mongo.uri, {
  useCreateIndex: true,
  keepAlive: 1,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const seedAircraftDB = require('./seedAircraftDB');
const seedFlyingSquadronsDB = require('./seedFlyingSquadronsDB');
const seedWingsDB = require('./seedWingsDB');
const seedPersonnelDB = require('./seedPersonnelDB');
const seedFlightSafetyReportsDB = require('./seedFlightSafetyReportsDB');
const seedUsersDB = require('./seedUsersDB');

(async () => {
  console.log('seeding db');
  await seedAircraftDB();
  await seedFlyingSquadronsDB();
  await seedWingsDB();
  await seedPersonnelDB();
  await seedFlightSafetyReportsDB();
  await seedUsersDB();
  process.exit(0);
})();
