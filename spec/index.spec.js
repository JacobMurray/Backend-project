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
      return request
      .get('/api/wrongurl')
      .expect(404)
      .then(res => {
        expect(res.body.message).to.equal('/api/wrongurl does not exist')
      })
    });
  });

  // CREATE USER

  describe('/api/user', () => {
    it('POST returns 201 and userData', () => {
      return request
      .post('/api/user')
      .send({
        name: 'Mr Bean',
        username: 'beanie',
        password: 'password',
        confirm: 'password'
      })
      .expect(201)
      .then(res => {
        expect(res.body).to.have.property('salt')
        expect(res.body).to.have.property('hash')
        expect(res.body).to.have.property('_id')
        expect(res.body.score).to.equal(0)
        expect(res.body.name).to.equal('Mr Bean')
        expect(res.body.username).to.equal('beanie')
      })
    })
    it('POST returns 400 when passwords do not match', () => {
      return request
      .post('/api/user')
      .send({
        name: 'Mr Bean',
        username: 'beanie',
        password: 'password',
        confirm: 'passwordssss'
      })
      .expect(400)
      .then(res => {
        expect(res.body.error).to.equal('Passwords must match')
      })
    })
    it('POST returns 400 when fields have not been filled', () => {
      return request
      .post('/api/user')
      .send({
        username: 'beanie',
        password: 'password',
        confirm: 'passwordssss'
      })
      .expect(400)
      .then(res => {
        expect(res.body.message).to.equal('Please fill out all fields')
      })
    })

    // LOGIN USER
    
    describe('/login', () => {
      it('Post returns 200 and user when correct details are given', () => {
        return request
        .post('/api/user/login')
        .send({
          username: 'NickyBee',
          name: 'Nick Bansal',
          password: 'password',
        })
        .expect(200)
      })
      it('POST returns 401 when incorrect password', () => {
        return request
        .post('/api/user/login')
        .send({
          username: 'NickyBee',
          name: 'Nick Bansal',
          password: 'pas',
        })
        .expect(401)
        .then(res => {
          expect(res.body.message).to.equal('Invalid Username or Password.')
        })
      })
      it.only('POST returns 401 when incorrect username', () => {
        return request
        .post('/api/user/login')
        .send({
          username: 'Nic',
          name: 'Nick Bansal',
          password: 'password',
        })
        .expect(401)
        .then(res => {
          expect(res.body.message).to.equal('Invalid Username or Password.')
        })
      })
    })

    describe('/:username', () => {
      it('PATCH updates the score', () => {
        return request
        .patch(`/api/user/${user[0].username}?score=10`)
        .expect(200)
        .then(res => {
          expect(res.body.score).to.equal(10)
        })
      })
    })

  });
});