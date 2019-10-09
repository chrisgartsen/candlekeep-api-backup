const request = require('supertest');

const app =  require('../../../src/app')
const Book = require('../../../src/models/book')

describe('Create book', () => {

  beforeEach(async (done) => {
    await Book.deleteMany()
    done()
  })

  test('POST creates a book', (done) => {
    const book = { title: 'The book title' }

    request(app)
      .post('/api/books')
      .send(book)
      .expect(201)
      .end((err, res) => {
        expect(res.body.book._id).not.toBeNull()
        expect(res.body.book.title).toBe(book.title)
        done()
      })
  })

  test('POST returns an error when required attributes are missing', (done) => {
    request(app)
      .post('/api/books')
      .send({})
      .expect(422)
      .end((err, res) => {
        expect(res.body.error).not.toBeNull()
        done()
      })
  })
})
