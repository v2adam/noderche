const users = require('./users');
const registeredUsers = require('./registeredUsers');


/*
  mongoose.Schema-val sémát lehet definiálni, ami aztán a mongoose.model tud használni
  a model-el lehet kapocsolatba kerülni a DB-vel

  pl.
  var myCustomSchema = new mongoose.Schema({ name: 'string', size: 'string' });
  var Tank = mongoose.model('Tank', myCustomSchema);
  a tanks nevű collection-be kerül majd

  magától mappelődik a dolog
  var smallTank = new Tank({ size: 'small' });

Schemas not only define the structure of your document and casting of properties, they also define
document instance methods, static Model methods, compound indexes and document lifecycle hooks
called middleware.

*/

// 1 index fájlból ajánlom ki, hogy ne kelljen mindig behúzni egyesével
module.exports = {
  users,
  registeredUsers
};
