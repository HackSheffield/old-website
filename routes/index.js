const fs = require('fs');
const path = require('path');

const express = require('express');
const router = express.Router();
const axios = require('axios');
const YAML = require('yamljs');

const graphql = fs.readFileSync(path.resolve('routes', 'teams.graphql'), 'utf8');

/* GET home page. */
router.get('/', async (req, res) => {
  const graphqlRes = await axios.post(
    'https://api.github.com/graphql',
    { query: graphql },
    { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
  );

  const org = graphqlRes.data.data.organization;
  const files = graphqlRes.data.data.organization.files;

  const teams = org.teams.edges.map(edge => edge.node);
  const teamBlacklist = JSON.parse(files.blacklist.text);
  const teamOrder = JSON.parse(files.order.text);

  const people = YAML.parse(files.people.text).map(
    (people, person) => ({ [person.github]: person })
  );

  teams.forEach(team => {
    team.members = team.members.edges.map(edge => edge.node);
  });

  res.render('index', {
    title: 'Teams',
    teams: teams,
    people,
    teamBlacklist,
    teamOrder
  });
});

module.exports = { router };
