const request = require('supertest');
const mongoose = require('mongoose')

const app =  require('../../../src/app')
const Book = require('../../../src/models/book')

describe('Get all books', () => {

  beforeEach(async(done) => {
    await Book.deleteMany()
    done()
  })


  test('GET returns a array with all books', async (done) => {
    const first = await Book.create({ title: 'First book' })
    const second = await Book.create({ title: 'Second book' })
    request(app)
      .get('/api/books')
      .expect(200)
      .end((err, res) => {
        expect(res.body.books.length).toBe(2)
        expect(res.body.books[0].title).toBe(first.title)
        expect(res.body.books[1].title).toBe(second.title)
        done()
      })
  })

  test('GET returns an empty array when no books are found', async (done) => {
    request(app)
      .get('/api/books')
      .expect(200)
      .end((err, res) => {
        expect(res.body.books).toEqual([])
        done()
      })
  })
})

describe('Get one book', () => {
  let book = null

  beforeEach(async(done) => {
    await Book.deleteMany()
    book = await Book.create({ title: 'The title' })
    done()
  })

  test('GET returns the requested book', (done) => {
    request(app)
      .get('/api/books/' + book._id)
      .expect(200)
      .end((err, res) => {
        expect(res.body.book.title).toBe(book.title)
        expect(res.body.book._id.toString()).toBe(book._id.toString())
        done()
      })
  })

  test('GET returns an error when no book is found', (done) => {
    const id = mongoose.Types.ObjectId()
    request(app)
      .get('/api/books/' + id)
      .expect(404)
      .end((err, res) => {
        expect(res.body.error).not.toBeNull()
        done()
      })
  })

  test('GET returns an error when a server error occurs', (done) => {
    request(app)
      .get('/api/books/invalid')
      .expect(505)
      .end((err, res) => {
        expect(res.body.error).not.toBe("Internal server error.")
        done()
      })
  })

})