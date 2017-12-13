const mongoose = require('mongoose');
// excelt csinál JSON-ből
const json2xls = require('json2xls');
const _ = require('lodash');

const db = require('../mongoDB/index');
const mySchema = require('../mongoDB/schema/index');
const { upload } = require('./fileupload');

const RegisteredUsersModel = mongoose.model('RegisteredUsers', mySchema.registeredUsers);
const PositionModel = require('../mongoDB/models/firstExample/positionModel');

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


// összes létező dashboard-ot adja vissza
const fetchExistingDashboard = async (req, res, next) => {
  try {
    const query = PositionModel.find().select('dashboardId -_id');
    const layout = await query.exec();
    res.status(200).send(layout);
  } catch (err) {
    res.status(500).send(err);
  }
};


// betöltés
const loadGridPosition = async (req, res, next) => {
  const id = req.params.dashboardId;
  try {
    const query = PositionModel.findOne({ dashboardId: id }).select('-_id').populate({
      path: '_user',
      select: 'userId username -_id',
    });
    const layout = await query.exec();
    // check private dashboard
    if (!_.isEmpty(layout) && layout.private) {
      if (_.isUndefined(req.currentUser)) {
        res.sendStatus(403);
      } else {
        const ownerFromDb = layout._user.userId;
        const userFromToken = req.currentUser.userId;
        if (ownerFromDb !== userFromToken) {
          res.sendStatus(403);
        } else {
          res.status(200).send(layout);
        }
      }
    } else {
      res.status(200).send(layout);
    }
  } catch (err) {
    res.status(500);
  }
};


// módosítás
const modifyGridPosition = async (req, res, next) => {
  const id = req.body.dashboardId;
  try {
    const updated = await PositionModel.findOneAndUpdate({ dashboardId: id }, {
      $set: {
        position: req.body.newPosition.lg,
        _user: req.currentUser._id
      }
    }, { new: true });

    if (_.isNull(updated)) {
      // ha nem találta meg, hogy melyik legyen update-elve
      res.sendStatus(204);
    } else {
      res.sendStatus(201);
    }
  } catch (err) {
    res.status(500);
  }
};


// törlés
const deleteGridPosition = async (req, res, next) => {
  const id = req.params.dashboardId;
  try {
    const query = PositionModel.remove({ dashboardId: id });
    const removeResult = await query.exec();
    if (removeResult.result.n === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};


// létrehozás
const newGridPosition = async (req, res, next) => {
  try {
    const user = req.currentUser;
    const newPosition = new PositionModel({ _user: user });
    await newPosition.save();
    res.status(201).send(newPosition);
  } catch (err) {
    res.sendStatus(500);
  }
};


module.exports = {
  getAllUsers,
  usaZip,
  secretUsers,
  createXls,
  uploadFile,
  fetchComponentType,
  loadGridPosition,
  modifyGridPosition,
  fetchExistingDashboard,
  deleteGridPosition,
  newGridPosition
};
