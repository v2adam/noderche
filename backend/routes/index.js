const express = require('express');

const router = express.Router();

/* GET home page. */
// jade template
// ez itt egy szerveroldali renderelés
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Api szerver' });
});

module.exports = router;
