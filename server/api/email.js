const router = require('express').Router();
const sgMail = require('../sendGrid/sendGrid');
const { parseTemplate, render } = require('../util');

router.post('/', async (req, res, next) => {
  try {
    const { template, inputs } = req.body;
    const { sender, recipient, subject } = inputs;

    const htmlTemplate = parseTemplate(template, inputs);
    const renderedHtml = render(htmlTemplate, inputs);

    const msg = {
      to: recipient,
      from: sender,
      subject: subject,
      html: renderedHtml
    };

    const response = await sgMail.send(msg);

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/preview', (req, res, next) => {
  try {
    const { template, inputs } = req.body;
    const htmlTemplate = parseTemplate(template, inputs);
    const renderedHtml = render(htmlTemplate, inputs);
    res.status(200).send(renderedHtml);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
