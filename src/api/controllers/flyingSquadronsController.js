const db = require('../models');

/**
 * Get squadrons list
 * @public
 */
module.exports = {
  findAll(req, res) {
    db.FlyingSquadron.find(req.query)
      .select('title')
      .then((flyingSquadrons) => {
        res.json(flyingSquadrons);
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  },
};
