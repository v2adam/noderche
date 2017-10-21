const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// itt lehet definiálni a tartalmát
const searchHistorySchema = mongoose.Schema({
  historyId: Number,
  address: { type: String, lowercase: true },
  // idegen kulcs a _id-ra hivatkozik a RegisteredUsers collectionben
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegisteredUsers'
  },
  created_ts: { type: Date, default: Date.now }
}, { versionKey: false, runSettersOnQuery: true });

// runSettersOnQuery: ennek a segítségével lehet a schema extra beállításait (pl. lowercase)
// használni a query során

// AutoIncrement-re példa
searchHistorySchema.plugin(AutoIncrement, { inc_field: 'historyId' });

// searchhistorys néven kerül a db-be
const SearchHistoryModel = mongoose.model('SearchHistory', searchHistorySchema);

module.exports = SearchHistoryModel;
