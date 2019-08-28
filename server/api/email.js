const router = require('express').Router();
const sgMail = require('../sendGrid/sendGrid');
const { renderFromTemplateString } = require('../util');

router.post('/', async (req, res, next) => {
  try {
    const { template, inputs } = req.body;
    const { sender, recipient, subject } = inputs;

    if (!sender || !recipient || !subject) {
      const error = new Error('Missing Fields');
      error.status = 400;
      next(error);
    } else {
      const msg = {
        to: recipient,
        from: sender,
        subject: subject,
        html: renderFromTemplateString(template, inputs)
      };

      const response = await sgMail.send(msg);
      res.status(202).json(response);
    }
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

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;
