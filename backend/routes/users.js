/* eslint-disable import/no-unresolved */
const express = require('express');

const router = express.Router();

const { registerUser, loginUser, authenticate } = require('../server_logic/userAuth');

// *************************************************************************************************
//                              nyilvános végpontok
// *************************************************************************************************

// user bejelenkezése
router.route('/login').post(loginUser);

// user regisztrálása
router.post('/register',
  (req, res, next) => registerUser(req, res, next),
  (req, res, next) => loginUser(req, res, next));


// *************************************************************************************************
//                                védett végpontok
// *************************************************************************************************

router.use(authenticate);

module.exports = router;
