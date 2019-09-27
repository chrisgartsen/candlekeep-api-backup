const request = require('supertest');

const app = require('../../src/app')

test('GET root should return version number', () => {
  return request(app).get('/')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect({ version: '0.0.1' })
})