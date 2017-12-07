const mongoose = require('mongoose');
// excelt csinál JSON-ből
const json2xls = require('json2xls');

const db = require('../mongoDB/index');
const mySchema = require('../mongoDB/schema/index');
const { upload } = require('./fileupload');

const RegisteredUsersModel = mongoose.model('RegisteredUsers', mySchema.registeredUsers);

// hozzon le minden user-t
const getAllUsers = (req, res, next) => {
  // sémával összekötve
  const usersModel = mongoose.model('users', mySchema.users);

  usersModel.find((err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(users);
    }
  });
};


// usa zip code dataset
const usaZip = (req, res, next) => {
  // lekérdezés a DB-ből, az usa_zips collectionből
  const collection = db.collection('usa_zips');

  collection.find().toArray((err, zip) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(zip);
    }
  });
};

// userek védettek
const secretUsers = (req, res, next) => {
  // model alapján
  RegisteredUsersModel.find((err, zip) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(zip);
    }
  });
};

// adatbázisból tölt le adatokat és xlsx-et csinál belőlük
const createXls = (req, res, next) => {
  const collection = db.collection('usa_zips');

  collection.find().toArray((err, zip) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // excel-t csinál a JSON-ből
      const xls = json2xls(zip);

      // így lehet kiírni a fájlrendszerbe a fájlt és a fizikai fájlt elküldeni
      /*
      fs.writeFileSync(`${__dirname}/yourXLName.xlsx`, xls, 'binary');
      res.sendFile(`${__dirname}/yourXLName.xlsx`);
      */

      // egy-két beállítás, hogy xlsx legyen
      // JSON -> xlsx
      res.setHeader('Content-disposition', 'attachment; filename=theDocument.xlsx');
      res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('responseType', 'arraybuffer');
      res.charset = 'UTF-8';
      res.write(xls, 'binary');
      res.end();
    }
  });
};

// feltöltött fájl fájlrendszerbe rakása
const uploadFile = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.end(`Something went wrong!${err}`);
    }
    return res.end('File uploaded sucessfully!.');
  });
};


// komponens lista betöltése
const fetchComponentType = (req, res, next) => {
  const collection = db.collection('components');

  collection.find().toArray((err, component) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(component);
    }
  });
};


// komponens lista betöltése
const loadGridPosition = (req, res, next) => {
  const collection = db.collection('layouts');

  collection.find().toArray((err, layout) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(layout);
    }
  });
};


module.exports = {
  getAllUsers,
  usaZip,
  secretUsers,
  createXls,
  uploadFile,
  fetchComponentType,
  loadGridPosition
};
