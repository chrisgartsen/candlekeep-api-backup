 const request = require('supertest')

 const app = require('../src/app')

describe('Login', () => {

  xtest('Valid credentials returns a JWT token', () => {
    return request(app)
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'password'})
      .set('Accept', 'application/json')
      .expect(503)
  })

  xtest('An invalid email returns an error', () => {

  })

  xtest('An invalid password returns an error', () => {
    
  })

})

