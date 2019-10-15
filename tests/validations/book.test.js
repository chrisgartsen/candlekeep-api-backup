const { validate, bookSchema } = require('../../src/utils/validations')

describe('Book validations', () => {

  test('Returns an empty error when validation passes', () => {
    const bookData = { 
      title: "My Title"
    }
    expect(validate(bookData, bookSchema)).toBeUndefined()
  }) 
  
  xtest('Returns an error when the title is missing', () => {
    const error = validate({}, bookSchema)
    expect(error).toBeDefined()
    expect(error.details[0].message).toBe('"title" is required')
  })

  xtest('Returns an error when the author is missing', () => {
    
  })
  
})

