const db = require('../models');

/**
 * Get wings list
 * @public
 */
module.exports = {
  findAll(req, res) {
    db.Wing.find(req.query)
      .select('title')
      .then((wings) => {
        res.json(wings);
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  },
};
