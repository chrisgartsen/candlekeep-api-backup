const request = require('supertest');
const mongoose = require('mongoose')

const app =  require('../../../src/app')
const Book = require('../../../src/models/book')

describe('Delete book', () => {
  let book = null

  beforeEach(async(done) => {
    await Book.deleteMany()
    book = await Book.create({ title: 'The title' })
    done()
  })

  test('DELETE deletes a book and returns the deleted book', async (done) => {
    request(app)
      .delete('/api/books/' + book._id)
      .expect(200)
      .end((err, res) => {
        expect(res.body.book.title).toBe(book.title)
        expect(res.body.book._id.toString()).toBe(book._id.toString())
        done()
      })

    const count = await Book.countDocuments()
    console.log(count)
    expect(count).toBe(0)
  })

  test('DELETE returns an error when no book is found', (done) => {
    const id = mongoose.Types.ObjectId()
    request(app)
      .delete('/api/books/' + id)
      .expect(404)
      .end((err, res) => {
        expect(res.body.error).not.toBeNull()
        done()
      })
  })

})
