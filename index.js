const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true});

nightmare
  .goto('https://ratemds.com')
  .type('#doctor-search', 'super')
  .click('.input-group-btn button')
  .wait('.hd .r')
  .evaluate(function () {
    return document.querySelector('.hd .r a').href;
  })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });