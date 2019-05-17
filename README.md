# The HackSheffield Society Website

Welcome to the source code for the HackSheffield website! We welcome pull requests, feel free to submit an issue if you have an idea!

## Getting Started

1. Install Node.JS
2. Clone this repository
3. `npm install`
4. Grab a GitHub personal access token (to power the team section): https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/
5. `GITHUB_TOKEN=<insert token here> npm run start:dev`

### Minimum permissions required for GitHub token

The teams section is powered by the GitHub GraphQL API. To use the API, you need an access token with enough permissions. The website node app is configured to read the GITHUB_TOKEN environmental variable. Make sure this is set when deploying and/or running locally.

Make sure you have the following selected when generating your token in order to run the site:

- repo
- read:org
- user:email
