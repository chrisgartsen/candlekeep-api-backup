const Axios = require('axios')

module.exports.findBookByIsbn = async (req, res, next) => {
  const isbn = req.params.isbn

  if(!isbn || isbn.length < 10) return res.status(422).json({ error: 'Invalid ISBN' })

  try {
    let result = await Axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)

    if(result.data.totalItems == 0) {
      result = await Axios.get(`https://www.googleapis.com/books/v1/volumes?q=${isbn}`)
    }
    if(result.data.totalItems == 0) return res.status(404).json({ error: 'No books found'})
    const rawBook = result.data.items[0]

    const book = {
      isbn: isbn,
      title: rawBook.volumeInfo.title,
      author: {
        name: rawBook.volumeInfo.authors ? rawBook.volumeInfo.authors[0] : undefined
      },
      publisher: {
        name: rawBook.volumeInfo.publisher
      },
      genre: {
        name: rawBook.volumeInfo.categories ?  rawBook.volumeInfo.categories[0] : undefined
      },
      publishedDate: rawBook.volumeInfo.publishedDate,
      description: rawBook.volumeInfo.description,
      language: rawBook.volumeInfo.language,
      thumbnail: rawBook.volumeInfo.imageLinks ? rawBook.volumeInfo.imageLinks.thumbnail : undefined
    }
    res.status(200).json(book)
  } catch(err) {
    console.log(err)
    next(err)
  }
}

// 9789022580288

// 9789024560387

// 9789049901998
