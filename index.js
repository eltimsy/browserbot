// frameDocument = document.querySelector('frame').contentDocument
// otherFrame = frameDocument.querySelector('otherframe').contentDocument
// button = otherFrame.querySelector('#submit')
// button.click()
(function RunNightmare(i) {
  const promise = new Promise((resolve, reject) => {
    const Nightmare = require('nightmare');
    const nightmare = Nightmare({ show: true, switches: {'ignore-certificate-errors': true}, webSecurity: false, alwaysOnTop: false});

    Nightmare.action('clickAll', function(selector, done) {
      this.evaluate_now((selector)=> {
        var elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          var event = document.createEvent('MouseEvent');
          event.initEvent('click', true, true);
          element.dispatchEvent(event);
        })
      }, done, selector)
    })

    nightmare
      .goto('')
      .type('#doctor-search', doctors[i])
      .click('.input-group-btn button')
      .wait('#doctor-list')
      .click('#doctor-list .search-item-doctor-link')
      .wait('#doctor-rating-form')
      .clickAll('#doctor-rating-form .stars .star')
      .type('#doctor-rating-form .form-control', 'I am a super bot and I can write ratings by myself')
      .click('#doctor-rating-form button')
      .wait(1000)
      // .evaluate(function () {
      //   return document.querySelector('#doctor-list .search-item-doctor-name').textContent;
      // })
      .end()
      .then(function (result) {
        console.log(i)
        resolve();
      })
      .catch(function (error) {
        console.log('failed')
        reject();
      });
  }).then( () => i >= 5 || RunNightmare(i+1))
  .catch(() => i >= 5 || RunNightmare(i+1));
})(0);



