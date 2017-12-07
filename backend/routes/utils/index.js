const express = require('express');

const router = express.Router();

const { authenticate } = require('../../server_logic/userAuth');
const { loadRandomGiphyByTag } = require('../../server_logic/utils');
const { fetchComponentType, loadGridPosition } = require('../../server_logic/mongoMW');


// api/v1/util

router.get('/fetch_random_giphy', loadRandomGiphyByTag);

router.get('/fetch_components', fetchComponentType);
router.get('/load_grid_position', loadGridPosition);


router.use(authenticate);

module.exports = router;
