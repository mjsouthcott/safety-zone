const db = require('../src/api/models');

const flightSafetyReportSeed = [
  /*
	*	Wing: 1 (14 Wing Greenwood)
	*	Flying Squadron: 1 (404 Long Range Patrol and Training Squadron)
	* 	Aircraft: 1 (CP-140 Aurora/GW-0000)
	* 	Flight Safety Report: 1 (Birdstrike during takeoff)
	*/
  {
    date: new Date('Febrauary 19, 2021 11:34:00').toLocaleDateString(),
    time: new Date('Febrauary 19, 2021 11:34:00').toLocaleTimeString(),
    occurrenceType: 'Air',
    additionalOccurrenceTypes: ['Bird Strike'],
    cf140Filed: 'Filed',
    personnelCasualtyLevel: 'Nil',
    safetyOfFlightCompromiseLevel: 'Medium',
    aircraftDamageLevel:
			'Very Serious (multiple major components/3rd line)',
    stageOfOperations: 'Takeoff',
    altitude: 1000,
    ias: 450,
    missionType: 'Long range patrol',
    barrierEngaged: true,
    occurrenceLocation: 'Near airport',
    navaidLocationIdent: 1800,
    navaidLocationDistanceTo: 50,
    navaidLocationBearingTo: 270,
    descriptionTitle: 'Birdstrike during takeoff',
    descriptionNarrative:
			'Birds struck canopy and radome, resulting in cracked canopy and radome, and inoperable radar',
    personnel: [],
    weather: 'Sunny',
    lightConditions: 'Bright',
    cloud: 'N/A',
    visibility: 100,
    windSpeed: 25,
    windDirection: 45,
    birdstrikeCategory: 'Impact',
    birdstrikeRemainsSubmitted: false,
    birdstrikeWithin50NMOfAirport: true,
    birdstrikeFlightDisruption: 'Returned to Airport',
    birdstrikeNOTAMWarning: 'Was Alerted',
    birdstrikeLightsOn: 'External',
    birdstrikePartsStruck: ['Canopy', 'Radome'],
    birdstrikeDamageType: 'Windshield or Other Glazing Damaged',
    birdstrikeBirdSpecies: 'Duck',
    birdstrikeBirdQuantity: 10,
    birdstrikeBirdSizeClassification: 'Large (duck)',
    status: 'Submitted',
  },

  /*
	*	Wing: 1 (14 Wing Greenwood)
	*	Flying Squadron: 1 (404 Long Range Patrol and Training Squadron)
	* 	Aircraft: 1 (CP-140 Aurora/GW-0000)
	* 	Flight Safety Report: 2 (Failed tire during landing)
	*/
  {
    date: new Date('January 16, 2021 22:15:00').toLocaleDateString(),
    time: new Date('January 16, 2021 22:15:00').toLocaleTimeString(),
    occurrenceType: 'Ground',
    additionalOccurrenceTypes: [],
    cf140Filed: 'Filed',
    personnelCasualtyLevel: 'Green (minor injury)',
    safetyOfFlightCompromiseLevel: 'Medium',
    aircraftDamageLevel: 'Minor',
    stageOfOperations: 'Landing',
    altitude: 0,
    ias: 300,
    missionType: 'Training',
    barrierEngaged: false,
    occurrenceLocation: 'Near airport',
    navaidLocationIdent: 1800,
    navaidLocationDistanceTo: 50,
    navaidLocationBearingTo: 270,
    descriptionTitle: 'Failed tire during landing',
    descriptionNarrative:
			'Tire failed during landing, resulting in minor injuries to aircrew',
    personnel: [],
    weather: 'Rain',
    lightConditions: 'Low',
    cloud: 'Yes',
    visibility: 2,
    windSpeed: 40,
    windDirection: 135,
    status: 'Closed',
  },

  /*
	*	Wing: 2 (19 Wing Comox)
	*	Flying Squadron: 5 (418 Search and Rescue Operational Training Squadron)
	*	Aircraft: 13 (CC-295 Kingfisher/CX-0003)
	*	Flight Safety Report: 3 (Metal deposited in oil filters)
	*/
  {
    date: new Date('December 5, 2020 9:06:00').toLocaleDateString(),
    time: new Date('December 5, 2020 9:06:00').toLocaleTimeString(),
    occurrenceType: 'Ground',
    additionalOccurrenceTypes: [],
    cf140Filed: 'Not Required',
    personnelCasualtyLevel: 'Nil',
    safetyOfFlightCompromiseLevel: 'Low',
    aircraftDamageLevel: 'Serious (major component/3rd line)',
    stageOfOperations: 'Maintenance',
    altitude: 0,
    ias: 0,
    missionType: 'N/A',
    barrierEngaged: false,
    occurrenceLocation: 'Maintenance hangar',
    navaidLocationIdent: 0,
    navaidLocationDistanceTo: 0,
    navaidLocationBearingTo: 0,
    descriptionTitle: 'Metal deposited in oil filters',
    descriptionNarrative:
			'During preventive maintenance inspection, metal deposits found in oil filters',
    personnel: [],
    weather: 'N/A',
    lightConditions: 'N/A',
    cloud: 'N/A',
    visibility: 0,
    windSpeed: 0,
    windDirection: 0,
    status: 'Investigation Ongoing',
  },
];

const seedFlightSafetyReportsDB = async function seed() {
  return new Promise((resolve) => {
    db.Personnel.find().then((personnel) => {
      for (let i = 0; i < personnel.length; i++) {
        flightSafetyReportSeed[1].personnel.push(personnel[i]._id);
      }
      db.Wing.find()
        .populate({
          path: 'flyingSquadrons',
          populate: {
            path: 'aircraft',
          },
        })
        .then((wings) => {
          flightSafetyReportSeed[0].wingOperatedBy = wings[0]._id;
          flightSafetyReportSeed[0].flyingSquadronOperatedBy =
				wings[0].flyingSquadrons[0]._id;
          flightSafetyReportSeed[1].wingOperatedBy = wings[0]._id;
          flightSafetyReportSeed[1].flyingSquadronOperatedBy =
				wings[0].flyingSquadrons[0]._id;
          flightSafetyReportSeed[2].wingOperatedBy = wings[1]._id;
          flightSafetyReportSeed[2].flyingSquadronOperatedBy =
				wings[1].flyingSquadrons[1]._id;
          flightSafetyReportSeed[0].aircraft =
				wings[0].flyingSquadrons[0].aircraft[0]._id;
          flightSafetyReportSeed[1].aircraft =
				wings[0].flyingSquadrons[0].aircraft[0]._id;
          flightSafetyReportSeed[2].aircraft =
				wings[1].flyingSquadrons[1].aircraft[0]._id;
          db.FlightSafetyReport.insertMany(flightSafetyReportSeed).then((flightSafetyReports) => {
            console.log(`${flightSafetyReports.length} FlightSafetyReport records inserted!`);
            db.Aircraft.find().then((aircraft) => {
              aircraft[0].flightSafetyReports.push(
                flightSafetyReports[0]._id,
                flightSafetyReports[1]._id,
              );
              aircraft[12].flightSafetyReports.push(flightSafetyReports[2]._id);
              db.Aircraft.collection
                .bulkWrite(aircraft.map(aircraft => ({
                  updateOne: {
                    filter: {
                      _id: aircraft._id,
                    },
                    update: {
                      $set: aircraft,
                    },
                  },
                })))
                .then(() => {
                  personnel.forEach((personnel) => {
                    personnel.flightSafetyReport =
										flightSafetyReports[1]._id;
                  });
                  db.Personnel.collection
                    .bulkWrite(personnel.map(personnel => ({
                      updateOne: {
                        filter: {
                          _id: personnel._id,
                        },
                        update: {
                          $set: personnel,
                        },
                      },
                    })))
                    .then((flightSafetyReports) => {
                      console.log(`${flightSafetyReports.length} flightSafetyReports records inserted!`);
                      resolve();
                    });
                });
            });
          });
        });
    });
  });
};

module.exports = seedFlightSafetyReportsDB;
