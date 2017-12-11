const mongoose = require('mongoose');

const positionSchema = mongoose.Schema({
  userId: Number,
  position: [{
    h: Number,
    i: String,
    minH: Number,
    minW: Number,
    maxH: Number,
    maxW: Number,
    static: Boolean,
    w: Number,
    x: Number,
    y: Number
  }
  ],
  created_ts: { type: Date, default: Date.now }
}, { versionKey: false, runSettersOnQuery: true });

const PositionModel = mongoose.model('layouts', positionSchema);

module.exports = PositionModel;
