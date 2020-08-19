const express = require('express')
const logger = require('morgan')
const authRoutes = require('../routes/authRoutes')
const request = require('request')
const http = require('http')
const { register, login, me } = require('../services/auth.service')

const app = express()

app.use(logger('dev'))
app.use(express.json())
authRoutes(app);

describe('[POST] Auth ::', function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  let server;

  beforeAll(() => {
    server = http.createServer(app)
    server.listen(4000)
  });

  afterAll(() => {
    server.close()
  });

  const fecha = new Date().getTime()
  const random = Math.floor(Math.random() * 1000000) + 1  

  const email = `test_${fecha}@testemail${random}.com`;
  const password = '123456';
  const confirm_password = '123456';
  let token

  it('/register SAVE USER ::', done => {
    request.post(
      'http://localhost:3000/auth/register/',
      {
        json: {
          email,
          password,
          confirm_password
        }
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(201);

        expect(Object.keys(body)).toContain('success');
        expect(Object.keys(body)).toContain('token');
        expect(Object.keys(body)).toContain('data');

        token = body.token

        const newEmail = body.data.email
        expect(newEmail).toEqual(email);
      done();
    })
  });

  it('/register EMPTY DATA ::', done => {
    request.post(
      'http://localhost:3000/auth/register/',
      {},
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(body)).toEqual({
          "success": false,
          "errors": [
              "NO_INFO"
          ]
        });
      done();
    })
  });

  it('/register DUPLICATE DATA ::', done => {
    request.post(
      'http://localhost:3000/auth/register/',
      {
        json: {
          email,
          password,
          confirm_password
        }
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(body).toEqual({
          "auth": false,
          "token": null,
          "error": "EMAIL_ALREADY_EXIST"
        });
      done();
    })
  });

  it('/login ::', done => {
    request.post(
      'http://localhost:3000/auth/login',
      {
        json: {
          email,
          password
        }
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        
        expect(Object.keys(body)).toContain('auth');
        expect(Object.keys(body)).toContain('token');
      done();
    })
  });

  it('/login NO DATA::', done => {
    request.post(
      'http://localhost:3000/auth/login',
      {
        json: {}
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(403);
        
        expect(body).toEqual('NO_INFO');
      done();
    })
  });

  it('/me ::', done => {
    request.post(
      'http://localhost:3000/auth/me/',
      {
        json: {
          userId: '5f3c5f1d0c62e30b5c75a9af'
        }
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        
        expect(Object.keys(body.user)).toContain('_id');
        expect(Object.keys(body.user)).toContain('email');
      done();
    })
  });
});