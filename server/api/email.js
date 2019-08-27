const router = require('express').Router();
const sgMail = require('../sendGrid/sendGrid');
const { renderFromTemplateString } = require('../util');

router.post('/', async (req, res, next) => {
  try {
    const { template, inputs } = req.body;
    const { sender, recipient, subject } = inputs;

    const msg = {
      to: recipient,
      from: sender,
      subject: subject,
      html: renderFromTemplateString(template, inputs)
    };

    const response = await sgMail.send(msg);
    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/preview', (req, res, next) => {
  try {
    const { template, inputs } = req.body;
    const renderedHtml = renderFromTemplateString(template, inputs);
    res.status(200).send(renderedHtml);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
