const db = require('../src/api/models');

const wingSeed = [
  /*
	 *	Wing: 1 (14 Wing Greenwood)
	 */
  {
    title: '14 Wing Greenwood',
    flyingSquadrons: [],
  },

  /*
	 *	Wing: 2 (19 Wing Comox)
	 */
  {
    title: '19 Wing Comox',
    flyingSquadrons: [],
  },

  /*
	 *	Wing: 3 (4 Wing Cold Lake)
	 */
  {
    title: '4 Wing Cold Lake',
    flyingSquadrons: [],
  },
];

const seedWingsDB = async function seed() {
  return new Promise((resolve) => {
    db.FlyingSquadron.find().then((flyingSquadrons) => {
      let idx = 0;
      for (i = 0; i < wingSeed.length; i++) {
        for (let j = 0; j < flyingSquadrons.length / wingSeed.length; j++) {
          wingSeed[i].flyingSquadrons.push(flyingSquadrons[idx]._id);
          idx += 1;
        }
      }
      db.Wing.insertMany(wingSeed).then((wings) => {
        console.log(`${wings.length} Wing records inserted!`);
        let idx = 0;
        for (let i = 0; i < wings.length; i += 1) {
          for (let j = 0; j < flyingSquadrons.length / wings.length; j += 1) {
            wingSeed[i].flyingSquadrons.push(flyingSquadrons[idx]._id);
            flyingSquadrons[idx].wing = wings[i]._id;
            idx += 1;
          }
        }
        db.FlyingSquadron.collection
          .bulkWrite(flyingSquadrons.map((flyingSquadron) => ({
            updateOne: {
              filter: {
                _id: flyingSquadron._id,
              },
              update: {
                $set: flyingSquadron,
              },
            },
          })))
          .then(() => resolve());
      });
    });
  });
};

module.exports = seedWingsDB;
