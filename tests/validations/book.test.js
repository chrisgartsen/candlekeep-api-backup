const { validateBook } = require('../../src/utils/validations')

test('Returns an empty error when validation passes', () => {
  const bookData = { 
    title: "My Title"
  }
  expect(validateBook(bookData)).toBeUndefined()
}) 

test('Retuns an error when the title is missing', () => {
  const error = validateBook({})
  expect(error).toBeDefined()
  expect(error.details[0].message).toBe('"title" is required')
})