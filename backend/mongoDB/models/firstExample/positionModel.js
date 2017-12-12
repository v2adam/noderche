const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const positionSchema = mongoose.Schema({
  dashboardId: Number,
  private: { type: Boolean, default: false },
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegisteredUsers'
  },
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

positionSchema.plugin(AutoIncrement, { inc_field: 'dashboardId' });

const PositionModel = mongoose.model('layouts', positionSchema);

module.exports = PositionModel;
