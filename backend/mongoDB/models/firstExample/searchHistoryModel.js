const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// itt lehet definiálni a tartalmát
const searchHistorySchema = mongoose.Schema({
  searchId: Number,
  address: { type: String, lowercase: true },
  user: String,
  created_ts: { type: Date, default: Date.now }
}, { versionKey: false, runSettersOnQuery: true });

// runSettersOnQuery: ennek a segítségével lehet a schema extra beállításait (pl. lowercase)
// használni a query során

// generated sequence id lesz a userId
searchHistorySchema.plugin(AutoIncrement, { inc_field: 'searchId' });


// SearchHistory néven lesz a collection
const SearchHistoryModel = mongoose.model('SearchHistory', searchHistorySchema);

module.exports = SearchHistoryModel;
