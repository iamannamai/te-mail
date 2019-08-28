const request = require('supertest');
const server = require('../../../server');
const nock = require('nock');
const sendGridMock = nock(`https://api.sendgrid.com/v3`);

let app;
let httpServer;

describe('/api/email', () => {
  beforeAll(() => {
    httpServer = server.listen(process.env.PORT);
    app = request(server);
  });

  afterAll(() => {
    httpServer.close();
  });

  describe('POST /preview', () => {
    it('should return a 200 and preview of the email', async () => {
      const emailBody = {
        template: 'template %%key%% string',
        input: {
          sender: 'user@email.com',
          recipient: 'receiver@email.com',
          subject: 'subject title',
          key: 'value'
        }
      };

      const {
        res: { text }
      } = await app
        .post('/api/email/preview')
        .send(emailBody)
        .expect(200);
      // .done();
      expect(text).toBe('<div>template key string</div>');
    });

    // xit('should return a 400 if required fields are not returned', () => {});
  });

  describe('POST /api/email', () => {
    it('should return a 202 when email successfully sends', () => {
      const emailBody = {
        template: 'template %%key%% string',
        inputs: {
          key: 'value',
          sender: 'user@email.com',
          recipient: 'receiver@email.com',
          subject: 'subject title'
        }
      };

      sendGridMock.post('/mail/send').reply(202, {
        statusCode: 202,
        body: 'I did it, Mom!'
      });

      return app
        .post('/api/email')
        .send(emailBody)
        .expect(202);
    });

    it('should return the error code from sendMail when email fails', () => {
      const emailBody = {
        template: 'template %%key%% string',
        inputs: {
          key: 'value',
          sender: 'user@email.com',
          recipient: 'receiver@email.com',
          subject: 'subject title'
        }
      };
      sendGridMock.post('/mail/send').reply(400, {
        statusCode: 400
      });

      return app
        .post('/api/email')
        .send(emailBody)
        .expect(400);
    });
  });
});
