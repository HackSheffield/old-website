const fs = require('fs');
const path = require('path');

const express = require('express');
const router = express.Router();
const axios = require('axios');
const YAML = require('yamljs');

const graphql = fs.readFileSync(path.resolve('routes', 'teams.graphql'), 'utf8');

/* GET home page. */
router.get('/', (req, res) => {
  axios
    .post(
      'https://api.github.com/graphql',
      { query: graphql },
      { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
    )
    .then(graphqlRes => {
      const org = graphqlRes.data.data.organization;
      const files = graphqlRes.data.data.organization.files;

      const teams = org.teams.edges.map(edge => edge.node);
      const teamWhitelist = JSON.parse(files.whitelist.text);
      const teamOrder = JSON.parse(files.order.text);

      const people = YAML.parse(files.people.text).reduce((people, person) => ({
        ...people,
        [person.github]: person
      }), {});

      teams.map(team => {
        // unwrap node
        team.members = team.members.edges.map(edge => edge.node);

        // add role
        team.members = team.members.map(member => ({
          ...member,
          role: member.login in people ? people[member.login].role : 'member',
          twitter: member.login in people ? people[member.login].twitter : undefined
        }));

        // sort by roles
        team.members.sort((a, b) => {
          // a/b first word
          const afw = a.role.split(' ').slice(0, 1)[0].toLowerCase();
          const bfw = b.role.split(' ').slice(0, 1)[0].toLowerCase();

          // a/b team order
          const ato = teamOrder.includes(afw) ? teamOrder.indexOf(afw) : Infinity;
          const bto = teamOrder.includes(bfw) ? teamOrder.indexOf(bfw) : Infinity;

          return ato < bto ? -1 : 1;
        });
      });

      res.render('index', {
        title: 'Teams',
        teams,
        teamWhitelist,
        teamOrder
      });
    })
    .catch(error => {
      console.error(error);
      res.render('error', {
        error
      });
    });
});

router.get('/qrcode', (req, res) => {
  res.render('qrcode');
});

module.exports = { router };
