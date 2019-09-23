const request = require('supertest');

const app = require('../src/app')

test('Main', async () => {
  const response = await request(app).get('/');
  expect(response.statusCode).toBe(200);
})