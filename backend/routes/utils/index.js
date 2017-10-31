const express = require('express');

const router = express.Router();

const { authenticate } = require('../../server_logic/userAuth');
const { loadRandomGiphyByTag } = require('../../server_logic/utils');

// api/v1/util

router.get('/fetch_random_giphy', loadRandomGiphyByTag);

router.use(authenticate);

module.exports = router;
