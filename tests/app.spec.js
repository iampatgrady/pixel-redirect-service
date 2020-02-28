const request = require('supertest');
const app = require('../app');

describe('Test /', () => {

  test('It should respond 301 status to GET request for /', async done => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(301);
    done();
  });


  test('It should respond 200 status to POST request for / with data', async done => {
    const response = await request(app)
      .post('/')
      .set('origin', 'https://www.adswerve.com')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify([{name: 'testing', value: '12'}]));

    expect(response.statusCode).toBe(200);
    done();

  });

  test('It should throw a CORS error with invalid origin', async done => {
    const response = await request(app)
      .post('/')
      .set('origin', 'https://www.swervead.com/')
      .set('Content-Type', 'application/json')
      .send();

    expect(response.statusCode).toBe(500);
    done();
  })

  test('It should respond 413 status to POST request for / with data at 511 bytes', async done => {
    const response = await request(app)
      .post('/')
      .set('origin', 'https://www.adswerve.com')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify([{name:'jee',value:'whiz'},{name:'jee',value:'whiz'},{name:'jee',value:'whiz'},{name:'jee',value:'whiz'},{name:'jee',value:'whiz'},{name:'jee',value:'whiz'},{name:'jee',value:'whiz'},{name:'jee',value:'whiz'},{name:'jee',value:'whiz'},{name:'jee',value:'whiz'},{name:'jee',value:'whiz'},{name:'jee',value:'whiz'},{name:'jee',value:'whiz'},{name:'jee',value:'whiz'},{name:'jee',value:'whiz'},{name:'jee',value:'whiz'},{name:'jee',value:'whiz'}]));

    expect(response.statusCode).toBe(413);
    done();

  });


});
