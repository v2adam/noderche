const mongoose = require('mongoose');
const { databaseUri } = require('../config');

// adatbázis kapcsolat beállításai
// itt kell megadni a configot a mongoose-nak, onnantól kezdve a mongoose ismerni fogja a DB-t


// http://mongoosejs.com/docs/guide.html

/*

First, we need to define a connection.
If your app uses only one database, you should use mongoose.connect.
If you need to create additional connections, use mongoose.createConnection.


Important! Mongoose buffers all the commands until it's connected to the database.
This means that you don't have to wait until it connects to MongoDB
in order to define models, run queries, etc.

*/

// promise library-t kell megadni neki, ez a beépített ES6-os
mongoose.Promise = Promise;


// 1 DB-m van csak, elég a connect
// useMongoClient kell mert különben deprecated-et dob
mongoose.connect(databaseUri, {
  useMongoClient: true,
});

// a connection-nel érem el a DB-t
const db = mongoose.connection;

// ha db hiba van, akkor jelzi
db.on('error', console.error.bind(console, 'connection error:'));

/*
Once connected, the open event is fired on the Connection instance.
If you're using mongoose.connect, the Connection is mongoose.connection.
Otherwise, mongoose.createConnection return value is a Connection.
*/


// szól ha kész a kapcsolat a db-vel
db.once('open', () => {
  console.log('connected');
});


module.exports = db;
