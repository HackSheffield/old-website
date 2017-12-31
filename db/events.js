/*
 Schema
 ======

 Member object:

 {
  name
  startTime  // exact date object of start of event, for programming use
  dateStr    // OPTIONAL, nice string, for example for two day events "14-15th October 2017"
  url        // more info (eg. website or fb event)
 }

*/

module.exports = [
  {
    name: 'HackSheffield 3.0',
    startTime: (new Date(2017, 9, 14)),
    dateStr: '14-15th October 2017',
    url: 'https://www.facebook.com/events/362559537409144/'
  },
  {
    name: 'Web Servers - Spring Workshops',
    date: new Date(2018, 1, 19, 18),
    url: 'https://http.cat/204'
  },
  {
    name: 'Intro to APIs - Spring Workshops',
    date: new Date(2018, 1, 26, 18),
    url: 'https://http.cat/204'
  },
  {
    name: 'Front-end! - Spring Workshops',
    date: new Date(2018, 2, 5, 18),
    url: 'https://http.cat/204'
  }
];
