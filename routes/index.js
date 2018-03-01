const express = require('express');
const router = express.Router();
const axios = require('axios');
const YAML = require('yamljs');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) throw new Error('Supply GitHub token');

const graphql = `{
 organization(login:"hacksheffield") {
    databaseId
    repository(name:"people"){
      object(expression:"master:_data/people.yml"){
        repository{
          object(expression:"master:_config/team-blacklist.json"){
            ... on Blob {
              text
            }
          }
        }
        ... on Blob {
          text
        }
      }
    }
    teams (first: 100){
      edges {
        node{
          name
          members (first: 100){
            edges {
              node {
                name
                url
                login
                email
                avatarUrl
                websiteUrl
              }
            }
          }
        }
      }
    }
  }
}`;

/* GET home page. */
router.get('/', (req, res, next) => {
  axios
    .post(
      'https://api.github.com/graphql',
      { query: graphql },
      { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
    )
    .then(graphqlRes => {
      const teams = graphqlRes.data.data.organization.teams.edges.map(
        edge => edge.node
      );
      const people = YAML.parse(
        graphqlRes.data.data.organization.repository.object.text
      ).reduce((people, person) => {
        return { ...people, [person.github]: person };
      }, {});
      console.log(people);
      const teamBlacklist = JSON.parse(
        graphqlRes.data.data.organization.repository.object.repository.object
          .text
      );

      teams.forEach(team => {
        team.members = team.members.edges.map(edge => edge.node);
      });
      res.render('index', {
        title: 'Teams',
        teams: teams,
        people,
        teamBlacklist
      });
    })
    .catch(err => {
      console.error(err);
      res.render('error', {});
    });
});

module.exports = { router };
