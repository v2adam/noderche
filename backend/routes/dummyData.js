// api/v1/dummy/*****

// ez egy route fájl, itt állíthatod be, hogy milyen metódus hívódjon meg az adott végpontra
const express = require('express');

const router = express.Router();

const { getAllUsers, secretUsers, usaZip, createXls, uploadFile } = require('../server_logic/mongoMW');
const { authenticate } = require('../server_logic/userAuth');


// *************************************************************************************************
//                                nyilvános végpontok
// *************************************************************************************************


// ez egy get kérésre illeszkedik
router.get('/usa_zip', usaZip);

// middleware láncból ezt a 3 paramétert megkapja
router.get('/users', (req, res, next) => getAllUsers(req, res, next));

// így is működik a dolog
router.route('/public').get(secretUsers);

router.route('/upload').post(uploadFile);


// *************************************************************************************************
//                                védett végpontok
// *************************************************************************************************

// token-t követel meg a innentől kezdve
router.use(authenticate);

router.route('/secretusers').get(secretUsers);

router.route('/createxls').get(createXls);


module.exports = router;
