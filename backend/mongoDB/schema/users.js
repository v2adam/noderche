const mongoose = require('mongoose');


// jó tudni: ha az összemappelés nem megy, akkor hibát dob a perzisztálás során
// (pl nem passzol a típus)
// lehetnek beágyazott dokumentumok is
const users = mongoose.Schema({
  name: String,
  age: Number,
  bio: String,
  created_ts: { type: Date, default: Date.now }
  // valami_extra: String
}, { versionKey: false });


//* ************************************methods*************************************************//
// lehetnek a sémának metódusai

// saját készítésű metódus
users.methods.valamiMetodusaVan = function () {
  return this.name
    ? `Meow name is ${this.name}`
    : "I don't have a name";
};


users.methods.findSimilarTypes = function (cb) {
  return this.model('Users').find({ valami_extra: this.valami_extra }, cb);
};

//* *******************************statics******************************************************//

/*
statikus metódus
a következő pl a collection-ben keresi meg azokat, ahol
a name attribútumban van illeszkedés a inputra
és hozzáfűzi a statics-hoz
Do not declare statics using ES6 arrow functions (=>).
Arrow functions explicitly prevent binding this, so the above examples will not work because of the
value of this.
*/

users.statics.findByName = function (searchedName, cb) {
  return this.find({ name: new RegExp(searchedName, 'i') }, cb);
};


//* ***************************query helper*******************************************************//
// olyan mint a namedQuery
users.query.byNameNameQuery = function (name) {
  return this.find({ name: new RegExp(name, 'i') });
};


module.exports = users;
