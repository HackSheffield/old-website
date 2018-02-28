/*
 Schema
 ======

 Array defines order of output. (Eg. president first, etc.)

 Member object:

 {
  name
  avatar       // JPEG in /src/images/team/
  role         // position on team
  social: {
    email
    website
    twitter
    github
    linkedin
  }
 }

*/

module.exports = [
  {
    name: 'Greg Ives',
    avatar: 'greg',
    role: 'President',
    social: {
      email: 'greg@hacksheffield.co',
      github: 'gregives'
    }
  },
  {
    name: 'Sanziana Chiorescu',
    avatar: 'sanzi',
    role: 'Secretary',
    social: {
      email: 'sanziana@hacksheffield.co',
      twitter: 'SanzianaCh',
      github: 'SanzianaCh'
    }
  },
  {
    name: 'Danny Jones',
    avatar: 'danny',
    role: 'Media and Publicity Officer',
    social: {
      email: 'danny@hacksheffield.co',
      website: 'http://www.danielcarl.info',
      twitter: '_dannycjones',
      github: 'dannycjones',
      linkedin: 'danielcarljones'
    }
  },
  {
    name: 'Will Humphreys',
    avatar: 'will',
    role: 'Treasurer',
    social: {
      email: 'will@hacksheffield.co',
      twitter: 'wispeh_',
      github: 'TheWispy'
    }
  },
  {
    name: 'Luana Riebel',
    avatar: 'luana',
    role: 'Sponsorship Officer',
    social: {
      email: 'luana@hacksheffield.co',
      github: 'LLRiebel'
    }
  },
  {
    name: 'Rob Ede',
    avatar: 'rob',
    role: 'Media and Publicity Officer',
    social: {
      email: 'rob@hacksheffield.co',
      twitter: 'robjtede',
      github: 'robjtede'
    }
  },
  {
    name: 'Christopher McIntyre',
    avatar: 'chris',
    role: 'Organiser',
    social: {
      email: 'chris@hacksheffield.co',
      website: 'http://www.cgmcintyre.com',
      twitter: 'cgmcintyr',
      github: 'cgmcintyr',
      linkedin: 'cgmcintyre'
    }
  }
];
