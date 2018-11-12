process.env.NODE_ENV = 'test';
const app = require('../app');
const { expect } = require('chai');
const mongoose = require('mongoose');
const request = require('supertest')(app);
const seedDB = require('../seed/seed');
const { userData } = require('../seed/testData');

describe('/api', () => {
  let user;
  beforeEach(() => {
    return seedDB(userData).then(docs => {
      [user] = docs;
    });
  });
  after(() => {
      return mongoose.disconnect();
  })
  it('', () => {});
});