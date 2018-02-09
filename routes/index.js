const express = require('express');
const router = express.Router();
const axios = require('axios');
const YAML = require('yamljs');
console.log(process.env);
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) throw new Error('Supply GitHub token');

const graphql = `{
 organization(login:"hacksheffield") {
    avatarUrl
    databaseId
    repository(name:"people"){
      name
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
          description
          teamsUrl
          url
          slug
          combinedSlug
          name
          members (first: 100){
            edges {
              node {
                name
                bio
                url
                login
                location
                bioHTML
                email
                avatarUrl
                websiteUrl
                isCampusExpert
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
  axios.post('https://api.github.com/graphql',
    { query: graphql }, { headers: {'Authorization': `Bearer ${GITHUB_TOKEN}`} })
    .then((graphqlRes) => {
      console.log(graphqlRes.data);
      const teams = graphqlRes.data.data.organization.teams.edges.map(edge => edge.node);
      const people = {};
      YAML.parse(graphqlRes.data.data.organization.repository.object.text).forEach(person => {
        people[person.github] = person;
      });
      const teamBlacklist = JSON.parse(graphqlRes.data.data.organization.repository.object.repository.object.text);

      console.log(people);
      teams.forEach(team => team.members = team.members.edges.map(edge => edge.node));
      // const people = graphqlRes.data.data.organization.teams.edges.map(edge => edge.node)[0].members.edges.map(edge => edge.node);
      res.render('index', { title: 'Teams', teams: teams, people, teamBlacklist });
    })
    .catch((err) => {
      console.log(err);
      res.render('error', {});
    });
});

module.exports = { router };
