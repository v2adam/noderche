const mongoose = require('mongoose');

// itt lehet definiálni a tartalmát
const searchHistorySchema = mongoose.Schema({
  address: String,
  user: String,
  created_ts: { type: Date, default: Date.now }
}, { versionKey: false });

// SearchHistory néven lesz a collection
const SearchHistoryModel = mongoose.model('SearchHistory', searchHistorySchema);

module.exports = SearchHistoryModel;
