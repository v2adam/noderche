const express = require('express');

const router = express.Router();

const { authenticate } = require('../../server_logic/userAuth');
const { loadRandomGiphyByTag } = require('../../server_logic/utils');
const { fetchComponentType, loadGridPosition, saveGridPosition, fetchExistingDashboard } = require('../../server_logic/mongoMW');


// api/v1/util

router.get('/fetch_random_giphy', loadRandomGiphyByTag);

router.get('/fetch_components', fetchComponentType);

router.get('/fetch_existing_dashboard', fetchExistingDashboard);


router.use(authenticate);


router.get('/grid_position/:dashboardId', loadGridPosition);


router.post('/grid_position', saveGridPosition);


module.exports = router;
