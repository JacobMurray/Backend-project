# CAPTURE THE FLAG - BACKEND 
## Back End RESTful API

Capture the flag is an app which was created for our final Project of the Northcoders' Full Stack Developer Course.

This project aims to demonstrate some of the skills learnt in throughout our time at Northcoders whilst demonstrating new technologies:

* JavaScript programming
* Building a RESTful Web API to respond to HTTP requests
* Storing data and interacting with databases
* Test Driven Development
This back end application is consumed by a front end React-Native app. Details of the front end may be found on Github: github.com/JacobMurray/Backend-project.

## Using Captrue the flag

A working example of this API is published at https://capture-flag1.herokuapp.com/api.

### EndPoints
The API provides JSON responses to HTTP request methods relating to Users as described on the API.

#### Users 
* Users may be added using the POST request.
* Users can be retrieved using a POST request
* Users score can be updated using a PATCH request

#### Errors
Bad route, request and database errors result in the relevant 400/500 response headers and an error message in the JSON response body.

Express's next() method is used to handle errors.

## Installing a local copy
These instructions will help you to get a copy of Capture the flag up and running on your local machine for testing purposes.

#### INSTALLING
Before installing this project, ensure you have this software installed:

* Node.js 10.6.0
* MongoDB 3.4.17

Duplicate or fork this repository from github.com/JacobMurray/Backend-project.

Inside this new directory, install the required NPM packages:

```js
$ npm install 
```
Next, create a config directory in your project root. In this directory, add an index.js file with the following content:

```js
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  development: 'mongodb://localhost:27017/authenticate2',
  production: 'mongodb://<USERNAME>:<PASSWORD>.<YOUR_PRODUCTION_DB_URL>',
  test: 'mongodb://localhost:27017/authenticate2'
};

module.exports = config[process.env.NODE_ENV]
```
#### SEED THE DATABASE
Before seeding the database, ensure you have MongoDB running. In a separate CLI instance run the command:
```js
$ mongod
```

Data is stored in the ./seed/testData directory in JSON format. To seed your database with this data, run this command in your project CLI:
```js
$ npm run seed
```
#### RUN THE APPLICATION
```js
$ npm run dev
```
If successful you will see the following message
```js
listening on port 9090
```

## Built With
* Node.js - JavaScript runtime built on Chrome's V8 JavaScript engine
* Express.js - Web Framework for Node.js
* MongoDB - Document Database
* Mongoose - Object Modelling for Node and Mongo DB
* Mocha - JavaScript test framework
* Chai - Asserion based testing for Mocha
* Supertest - HTTP assertion testing agent


Changed
