const db = require('../models');

module.exports = {
  findAll(req, res) {
    db.Aircraft.find(req.query)
      .select('registration')
      .then((aircraft) => {
        res.json(aircraft);
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  },
};
