const request = require('supertest');

const app = require('../src/app')
const book = require('../src/models/book')

describe('Create book', () => {
  test('POST creates a book', () => {
    const book = {
      // isbn: '029-299-0202-288',
      title: 'The book title',
      // subtitle: 'The book subtitle',
      // author: 'The Author',
      // publisher: 'The publisher',
      // genre: 'The Genre',
      // yearPublished: 2019,
      // numberOfPages: 303
    }

    return request(app)
      .post('/api/books')
      .send(book)
      .expect(201)
  })

  xtest('POST returns an error when the title is missing', () => {

  })
})