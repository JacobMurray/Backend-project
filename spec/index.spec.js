process.env.NODE_ENV = 'test';
const app = require('../app');
const { expect } = require('chai');
const mongoose = require('mongoose');
const request = require('supertest')(app);
const seedDB = require('../seed/seed');
const  userData = require('../seed/testData/users');

describe('/api', () => {
  let user;
  beforeEach(() => {
    return seedDB(userData).then(docs => {
      user = docs;
    });
  });
  after(() => {
      return mongoose.disconnect();
  })
  describe('/api/wrongURL', () => {
    it('GET returns 404 error when passed a wrong url', () => {
      return request.get('/api/wrongurl')
      .expect(404)
      .then(res => {
        expect(res.body.message).to.equal('/api/wrongurl does not exist')
      })
    });
  });
  describe('/api/user', () => {
    it('POST returns 200 and userData', () => {
      return request
      .post('/api/user')
      .send({
        name: 'Mr bean',
        username: 'beanie',
        password: 'password',
        confirm: 'password'
      })
      .expect(201)
    });
  });
});