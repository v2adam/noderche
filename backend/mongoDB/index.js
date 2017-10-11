const mongoose = require('mongoose');
const { databaseUri } = require('../config');

// adatbázis kapcsolat beállításai

// http://mongoosejs.com/docs/guide.html

/*

First, we need to define a connection.
If your app uses only one database, you should use mongoose.connect.
If you need to create additional connections, use mongoose.createConnection.


Important! Mongoose buffers all the commands until it's connected to the database.
This means that you don't have to wait until it connects to MongoDB
in order to define models, run queries, etc.

*/


// a connection-t használom
const db = mongoose.connect(databaseUri).connection;

// a db néhány eseményére reagálás
db.on('error', console.error.bind(console, 'connection error:'));

/*
Once connected, the open event is fired on the Connection instance.
If you're using mongoose.connect, the Connection is mongoose.connection.
Otherwise, mongoose.createConnection return value is a Connection.
*/

db.once('open', () => {
  console.log('connected');
});


module.exports = db;
