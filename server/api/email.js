const router = require('express').Router();
const sgMail = require('./sendGrid/sendGrid');

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const msg = {
      to: 'test@example.com',
      from: 'test@example.com',
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>'
    };
    await sgMail.send(msg);

    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
