const request = require('supertest');
const app = require('../../../server');

xdescribe('Email', () => {
  it('should post to email', () => {
    const { body } = request(app)
      .post('/api/email')
      .expect(201);
    expect(body).toBe({});
  });
});
