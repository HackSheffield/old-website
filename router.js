const express = require('express');
const router = express.Router();

const team = require('./db/team.js');
const events = require('./db/events.js');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { team, events });
});

router.get('/hackathon/', (req, res, next) => {
  res.render('hackathon', { team });
});

module.exports = router;
