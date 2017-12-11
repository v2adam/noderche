const express = require('express');

const router = express.Router();

const { authenticate } = require('../../server_logic/userAuth');
const { loadRandomGiphyByTag } = require('../../server_logic/utils');
const { fetchComponentType, loadGridPosition, saveGridPosition } = require('../../server_logic/mongoMW');


// api/v1/util

router.get('/fetch_random_giphy', loadRandomGiphyByTag);

router.get('/fetch_components', fetchComponentType);

router.use(authenticate);

router.get('/grid_position', loadGridPosition);
router.post('/grid_position', saveGridPosition);


module.exports = router;
