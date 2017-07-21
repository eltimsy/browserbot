(function RunNightmare(i) {
  const promise = new Promise((resolve, reject) => {
    const doctors = []
    const Nightmare = require('nightmare');
    require('nightmare-iframe-manager')(Nightmare);
    const nightmare = Nightmare({ show: true, switches: {'ignore-certificate-errors': true}, webPreferences: {webSecurity: false}, alwaysOnTop: false});

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
      .enterIFrame('iframe[title="recaptcha challenge"]')
      .wait('#recaptcha-verify-button')
      .click('#recaptcha-verify-button')
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
        console.log(error)
        reject();
      });
  }).then( () => i >= 2 || RunNightmare(i+1))
  .catch(() => i >= 2 || RunNightmare(i+1));
})(0);



