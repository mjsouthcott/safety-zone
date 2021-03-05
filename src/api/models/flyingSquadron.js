const mongoose = require('mongoose');
const titles = require('../utils/flying_squadron/titles');

const { Schema } = mongoose;

const flyingSquadronSchema = new Schema(
  {
    title: {
      type: String,
      enum: titles,
      required: true,
      unique: true,
    },
    aircraft: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Aircraft',
      },
    ],
    wing: {
      type: Schema.Types.ObjectId,
      ref: 'Wing',
    },
  },
  {
    timestamps: true,
  },
);

const FlyingSquadron = mongoose.model('FlyingSquadron', flyingSquadronSchema);

module.exports = FlyingSquadron;
