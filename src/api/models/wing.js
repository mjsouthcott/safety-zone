const mongoose = require('mongoose');
const titles = require('../utils/wing/titles');

const { Schema } = mongoose;

const wingSchema = new Schema(
  {
    title: {
      type: String,
      enum: titles,
      required: true,
      unique: true,
    },
    flyingSquadrons: [
      {
        type: Schema.Types.ObjectId,
        ref: 'FlyingSquadron',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Wing = mongoose.model('Wing', wingSchema);

module.exports = Wing;
