const mongoose = require('mongoose');
// ez egy olyan csomag, amivel könnyen kezelhető a szekvencia
const AutoIncrement = require('mongoose-sequence')(mongoose);

const registeredUser = mongoose.Schema({
  userId: Number,
  username: String,
  password_digest: String,
  created_ts: { type: Date, default: Date.now }
}, { versionKey: false });

// generated sequence id lesz a userId
registeredUser.plugin(AutoIncrement, { inc_field: 'userId' });

// ez kb olyan mint egy namedQuery
registeredUser.query.byNameNameQuery = function (name) {
  return this.find({ username: name });
};


module.exports = registeredUser;
