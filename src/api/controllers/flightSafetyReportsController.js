const db = require('../models');

module.exports = {
  findAll(req, res) {
    db.FlightSafetyReport.find(req.query)
      .populate({
        path: 'aircraft',
        select: ['type', 'registration'],
      })
      .select([
        'date',
        'time',
        'occurrenceType',
        'additionalOccurrenceTypes',
        'descriptionTitle',
        'status',
      ])
      .then((flightSafetyReports) => {
        res.json(flightSafetyReports);
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  },
  findOneById(req, res) {
    db.FlightSafetyReport.findById(req.params.id)
      .populate([
        {
          path: 'wingOperatedBy',
          select: 'title',
        },
        {
          path: 'flyingSquadronOperatedBy',
          select: 'title',
        },
        {
          path: 'personnel',
          select: ['role', 'mosid', 'onboard', 'injury'],
        },
        {
          path: 'user',
          select: [
            'rank',
            'name',
            'mosid',
            'office',
            'telephone',
            'email',
          ],
        },
        {
          path: 'aircraft',
          select: ['type', 'registration'],
          populate: {
            path: 'flyingSquadron',
            select: 'title',
            populate: {
              path: 'wing',
              select: 'title',
            },
          },
        },
      ])
      .then(flightSafetyReport => res.json(flightSafetyReport))
      .catch((err) => {
        res.status(422).json(err);
      });
  },
};
