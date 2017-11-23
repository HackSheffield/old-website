const express = require('express');
const router = express.Router();

const team = require('../db/team');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { team });
});

module.exports = { router };
