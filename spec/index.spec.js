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
      it('POST returns 401 when incorrect username', () => {
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
      it('PATCH returns 401 when given not a number', () => {
        return request
        .patch(`/api/user/${user[0].username}?score=hello`)
        .expect(401)
        .then(res => {
          expect(res.body.message).to.equal('Invalid score type')
        })
      })
      it('GET request returns user by username', () => {
        return request
        .get(`/api/user/${user[0].username}`)
        .expect(200)
        .then(res => {
          expect(res.body.user.name).to.equal('Jacob Murray')
          expect(res.body.user.username).to.equal('Jacobgodslayer')
        })
      })
      it('GET request 400 if an ivalid username is entered', () => {
        return request
        .get('/api/user/wrongUsername')
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal('Username is not valid')
        })
      })
    })
  })

  // FLAG CAPTURED TESTING

  describe('/flag', () => {
    it('If given a wrong username, an error will occur', () => {
      return request
      .get(`/api/flag/hello`)
      //.expect(404)
      .then(res => {

        expect(res.body.message).to.equal('Username not found')
      })
    })
    it('GET request retrieves the updatedFlag and the generatedFlag', () => {
      return request
      .get(`/api/flag/${user[0].username}`)
      .expect(200)
      .then(res => {
        expect(res.body).to.have.property('generated')
        expect(res.body).to.have.property('captured')
      })
    })
    it('PATCH request updates long and lat for the users flag', () => {
      return request
      .patch(`/api/flag/${user[0].username}?longitude=20&latitude=40`)
      .expect(200)
      .then(res => {
        expect(res.body.user.flagLong).to.equal(20)
        expect(res.body.user.flagLat).to.equal(40)
        expect(res.body.user.flagGenerated).to.equal(true)
      })
    })
    it('PATCH request returns 404', () => {
      return request
      .patch(`/api/flag/badname?longitude=30&latitude=40`)
      .expect(404)
      .then(res => {
        expect(res.body.message).to.equal('Username not found')
      })
    })
    it('PATCH request throws an error if latitude or longitude are not numbers', () => {
      return request
      .patch(`/api/flag/${user[0].username}?longitude=hello&latitude=40`)
      .expect(400)
      .then(res => {
        expect(res.body.message).to.equal('Cast to number failed for value "hello" at path "flagLong"')
      })
    })
    it('PATCH request throws an error if latitude or longitude are not declared', () => {
      return request
      .patch(`/api/flag/${user[0].username}`)
      .expect(400)
      .then(res => {
        expect(res.body.message).to.equal('latitude and longitude is needed')
      })
    })

    describe('/capture', () => {
      it('PATCH request will update the flagCaptured and flagGenerated', () => {
        return request
        .patch(`/api/flag/${user[0].username}/capture`)
        .expect(200)
        .then(res => {
          expect(res.body.user.flagGenerated).to.equal(false)
          expect(res.body.user.flagCaptured).to.equal(true)
        })
      })
    })
    describe('/zone', () => {
      it('PATCH zone location', () => {
        return request
        .patch(`/api/flag/${user[0].username}/zone?longitude=10&latitude=40`)
        .expect(200)
        .then(res => {
          expect(res.body.user.zoneLat).to.equal(40)
          expect(res.body.user.zoneLong).to.equal(10)
        })
      })
    })
  })
  describe('/count', () => {
    it.only('PATCH zone location', () => {
      return request
      .patch(`/api/flag/${user[0].username}/count`)
      .expect(200)
      .then(res => {
        console.log(res.body.user)
        expect(res.body.user.dropFlagCount).to.equal(1)
      })
    })
  })
});