const express = require('express');

const router = express.Router();

const { authenticate } = require('../server_logic/userAuth');
const { listAll, saveOne, deleteOne, postPost, listPosts } = require('../server_logic/firstExample/firstExample');

// végpont prefix: /api/v1/first

router.use(authenticate);


// keresési előzmény listázása
router.get('/history', listAll);

// keresési kulcsszó mentése
router.post('/history', saveOne);

// megadott keresési előzmény törlése
router.delete('/history/:id', deleteOne);


// post hozzáadása
router.post('/posts', postPost);

// saját postok listázása
router.get('/posts', listPosts);


module.exports = router;
