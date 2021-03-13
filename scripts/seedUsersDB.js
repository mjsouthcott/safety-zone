const db = require('../src/api/models');
const bcrypt = require('bcryptjs');

const hash = bcrypt.hashSync('password', 10);

const userSeed = [
  /*
 * Wing: 1 (14 Wing Greenwood)
 * Flying Squadron: 1 (404 Long Range Patrol and Training Squadron)
 * Aircraft: 1 (CP-140 Aurora/GW-0000)
 * Flight Safety Report: 1 (Birdstrike during takeoff)
 * User: 1 (Reporter)
 */
  {
    rank: 'Capt / Lt(N)',
    name: 'Liam Smith',
    mosid: '00183: PLT',
    office: '101-111 Rhine Rd',
    telephone: '555-111-11111',
    email: 'lsmith@forces.gc.ca',
    password: '$2a$10$oDrVLPMlkxVtrHDDwo7VTuB0iiXsFlXJprD9SVTrh8.9VGYEND8CS',
    role: 'user',
    flightSafetyReports: [],
  },

  /*
 * Wing: 1 (14 Wing Greenwood)
 * Flying Squadron: 1 (404 Long Range Patrol and Training Squadron)
 * Aircraft: 1 (CP-140 Aurora/GW-0000)
 * Flight Safety Report: 2 (Failed tire during landing)
 * User: 2 (Reporter)
 */
  {
    rank: 'Lt / SLt',
    name: 'Olivia Brown',
    mosid: '00183: PLT',
    office: '102-222 Ubique Ave',
    telephone: '555-222-2222',
    email: 'obrown@forces.gc.ca',
    password: hash,
    role: 'user',
    flightSafetyReports: [],
  },

  /*
  * Flying Squadron: 5 (418 Search and Rescue Operational Training Squadron)
  * Aircraft: 13 (CC-295 Kingfisher/CX-0003)
  * Flight Safety Report: 3 (Metal deposited in oil filters)
  *  User: 3 (Reporter)
  */
  {
    rank: 'MCpl / MS',
    name: 'Noah Tremblay',
    mosid: '00135: AVN TECH',
    office: '103-333 Churchill Ave',
    telephone: '555-333-3333',
    email: 'ntremblay@forces.gc.ca',
    password: hash,
    role: 'user',
    flightSafetyReports: [],
  },

  /*
  *   User: 4 (Investigator)
  */
  {
    rank: 'Civ',
    name: 'Emma Martin',
    mosid: 'N/A',
    office: '104-444 Korea Rd',
    telephone: '555-444-4444',
    email: 'emartin@forces.gc.ca',
    password: hash,
    role: 'investigator',
    flightSafetyReports: [],
  },

  /*
  *   User: 5 (Administrator)
  */
  {
    rank: 'Civ',
    name: 'Oliver Roy',
    mosid: 'N/A',
    office: '105-555 Mons Ave',
    telephone: '555-555-5555',
    email: 'oroy@forces.gc.ca',
    password: hash,
    role: 'admin',
    flightSafetyReports: [],
  },
];

const seedUsersDB = async function seed() {
  return new Promise((resolve) => {
    db.FlightSafetyReport.find().then((flightSafetyReports) => {
      for (let i = 0; i < flightSafetyReports.length; i += 1) {
        userSeed[i].flightSafetyReports.push(flightSafetyReports[i]._id);
      }
      db.User.insertMany(userSeed, {
        writeConcern: 'majority',
        ordered: false,
      }).then((users) => {
        console.log(`${users.length} User records inserted!`);
        for (let i = 0; i < flightSafetyReports.length; i += 1) {
          const report = flightSafetyReports[i];
          report.user = users[i]._id;
        }
        db.FlightSafetyReport.collection
          .bulkWrite(flightSafetyReports.map(flightSafetyReport => ({
            updateOne: {
              filter: {
                _id: flightSafetyReport._id,
              },
              update: {
                $set: flightSafetyReport,
              },
            },
          })), {
            writeConcern: 'majority',
            ordered: false,
          }).then(() => resolve());
      });
    });
  });
};

module.exports = seedUsersDB;
