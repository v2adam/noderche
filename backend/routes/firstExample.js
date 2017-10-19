const express = require('express');

const router = express.Router();

const { authenticate } = require('../server_logic/userAuth');
const { listAll, saveOne, deleteOne } = require('../server_logic/firstExample/firstExample');


router.use(authenticate);


// listzázás
router.get('/list', listAll);

// logolás
router.post('/save', saveOne);

// törlés
router.delete('/delete', deleteOne);


module.exports = router;
