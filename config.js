let env = process.env.NODE_ENV || 'development';
​
const config = {
  development: {
    DB_URL: 'mongodb://localhost:27017/authenticate2'
  },
  test: {
    DB_URL: 'mongodb://localhost:27017/authenticate2_test'
  },
  production: {
    DB_URL: 'mongodb://ncjacob:password2@ds261253.mlab.com:61253/project-backend'
  }
}
​
​
module.exports = config[env]; 