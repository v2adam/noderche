// a lodash egy hasznos util csomag, nagy valószínűséggel megtalálsz benne mindent ami kell
const _ = require('lodash');
// jelszó hash-eléshez
const bcrypt = require('bcryptjs');
// mongoDB-hez nyújt elérést
const mongoose = require('mongoose');
// used to create, sign, and verify tokens
const jwt = require('jsonwebtoken');
// a moment egy hasznos dátum csomag
const moment = require('moment');

const { secretForToken } = require('../config');
const mySchema = require('../mongoDB/schema/index');

// kb olyan mint az entity JAVA-ban, ez áll legközelebb a DB-hez
const RegisteredUsersModel = mongoose.model('RegisteredUsers', mySchema.registeredUsers);

// user regisztrálása
const registerUser = async (req, res, next) => {
  // ellenőrzi, hogy a user létezik-e
  await RegisteredUsersModel.find().byNameNameQuery(req.body.username).then((alreadyExists) => {
    if (!_.isEmpty(alreadyExists)) {
      res.status(409).send('User already exists');
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err1, hashedPass) => {
          // ha a hashelés során hiba történt
          if (err1) {
            throw err1;
          }

          // olyan mint a DTO
          const newUser = ({
            username: req.body.username,
            password_digest: hashedPass,
          });

          // feltöltöm az entity-t
          const newUserInstance = new RegisteredUsersModel(newUser);

          // user elmentése
          newUserInstance.save((err2) => {
            // ha a user elmentése során hiba történt
            if (err2) {
              throw err2;
            }
            next();
          });
        });
      });
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
};

// user beléptetése
const loginUser = (req, res, next) => {
  // megnézem, hogy van-e user
  RegisteredUsersModel.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      res.status(401).send('Authentication failed. User not found');
    } else if (user) {
      // user által beírt jelszót a db-ben lévő hasheltel hasonlítja össze
      bcrypt.compare(req.body.password, user.password_digest).then((resp) => {
        if (resp === true) {
          // csinálok egy token-t a usernek
          const token = jwt.sign({
            userId: user.userId,
            username: user.username,
            exp: moment().unix() + 86400 // 1 nap múlva jár le a token
          }, secretForToken);
          // return the information including token as JSON
          res.json({ token, success: true });
        } else {
          res.status(401).send('Authentication failed. Wrong password');
        }
      }).catch(err => res.status(500).send(err));
    }
  }).catch(err => res.status(500).send(err));
};


// token alapján enged csak tovább
const authenticate = (req, res, next) => {
  // csak akkor menjen a dolog, ha van token
  if (!req.headers.authorization) {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
  // Authorization: Bearer tokennagyonhosszanittleszeztkellellenorizniesdekodolni
  const token = req.headers.authorization.split(' ')[1];

  // token ellenőrzése
  jwt.verify(token, secretForToken, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
    }
    // a middleware láncnak továbbadom a tokenből kinyert infókat
    req.decoded = decoded;

    const expectedUser = ({
      userId: req.decoded.userId,
      username: req.decoded.username
    });

    // megnézem, hogy benne van-e a DB-ben a user
    RegisteredUsersModel.findOne(expectedUser).select(['userId', 'username']).then((user) => {
      // ha nincs user a DB-ben, akkor dobjon hibát, hiába volt jó a tokenje
      if (_.isEmpty(user)) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
      } else {
        // továbbadom a middleware láncnak, hogy azonosíthatóan melyik user kérte a kérést
        // csak a userId-t és a username-t adom tovább, nem az összeset
        req.currentUser = user;
        next();
      }
    }).catch(errDb => res.status(500).json({
      success: false,
      message: errDb
    }));
  });
};


module.exports = {
  authenticate,
  registerUser,
  loginUser
};
