const Axios = require('axios')

module.exports.findBookByIsbn = async (req, res, next) => {
  const isbn = req.params.isbn

  if(!isbn || isbn.length < 10) res.status(422).json({ error: 'Invalid ISBN' })

  try {
    let result = await Axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)

    if(result.data.totalItems === 0) {
      result = await Axios.get(`https://www.googleapis.com/books/v1/volumes?q=${isbn}`)
    }

    if(!result.data.totalItems === 0) return res.status(404).json({ error: 'No books found'})

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
    next(err)
  }
}

// 9789022580288

// 9789024560387

// 9789049901998

/*

{
"kind": "books#volume",
"id": "XcsvAgAAQBAJ",
"etag": "LMzetxVRCwQ",
"selfLink": "https://www.googleapis.com/books/v1/volumes/XcsvAgAAQBAJ",
"volumeInfo": {
"title": "De eerste biechtmoeder",
"authors": [
"Terry Goodkind"
],
"publisher": "Luitingh Sijthoff Fantasy",
"publishedDate": "2012-11-30",
"description": "De Eerste Biechtmoeder – De Legende van Magda Searus Met de elf boeken omvattende serie De Wetten van de Magie wist Terry Goodkind wereldwijd miljoenen lezers aan zich te binden. Hoofdrolspelers Richard Rahl en Kahlan Amnell zijn inmiddels een begrip. In deze roman, De Eerste Biechtmoeder, doet Terry Goodkind een grote stap terug in de geschiedenis van De Wetten van de Magie. De lezer komt meer te weten over hoe ooit de oorlog tussen de Oude en de Nieuwe Wereld ontstond, over de ontstaansgeschiedenis van het Zwaard van de Waarheid, over het verbergen van de Tempel der Winden en meer, veel meer. Maar... ... weinig is bekend over de oorsprong van de Biechtmoeders, van wie ook Kahlan afstamt. In dit verre verleden, een tijd waarin Biechtmoeders nog niet bestonden en de wereld een duistere en gevaarlijke plek was, maken we kennis met een vrouw die alles is kwijtgeraakt, haar man, haar toekomst, alles. Kortom, een vrouw die niets meer te verliezen heeft. Dit is het verhaal van de allereerste Biechtmoeder: Magda Searus.",
"industryIdentifiers": [
{
"type": "ISBN_13",
"identifier": "9789024558537"
},
{
"type": "ISBN_10",
"identifier": "9024558530"
}
],
"readingModes": {
"text": true,
"image": true
},
"printType": "BOOK",
"categories": [
"Fiction"
],
"maturityRating": "NOT_MATURE",
"allowAnonLogging": true,
"contentVersion": "1.3.4.0.preview.3",
"panelizationSummary": {
"containsEpubBubbles": false,
"containsImageBubbles": false
},
"imageLinks": {
"smallThumbnail": "http://books.google.com/books/content?id=XcsvAgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
"thumbnail": "http://books.google.com/books/content?id=XcsvAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
},
"language": "nl",
"previewLink": "http://books.google.nl/books?id=XcsvAgAAQBAJ&printsec=frontcover&dq=9789024560387&hl=&cd=1&source=gbs_api",
"infoLink": "https://play.google.com/store/books/details?id=XcsvAgAAQBAJ&source=gbs_api",
"canonicalVolumeLink": "https://play.google.com/store/books/details?id=XcsvAgAAQBAJ"
},
"saleInfo": {
"country": "NL",
"saleability": "FOR_SALE",
"isEbook": true,
"listPrice": {
"amount": 9.99,
"currencyCode": "EUR"
},
"retailPrice": {
"amount": 9.99,
"currencyCode": "EUR"
},
"buyLink": "https://play.google.com/store/books/details?id=XcsvAgAAQBAJ&rdid=book-XcsvAgAAQBAJ&rdot=1&source=gbs_api",
"offers": [
{
"finskyOfferType": 1,
"listPrice": {
"amountInMicros": 9990000,
"currencyCode": "EUR"
},
"retailPrice": {
"amountInMicros": 9990000,
"currencyCode": "EUR"
}
}
]
},
"accessInfo": {
"country": "NL",
"viewability": "PARTIAL",
"embeddable": true,
"publicDomain": false,
"textToSpeechPermission": "ALLOWED",
"epub": {
"isAvailable": true,
"acsTokenLink": "http://books.google.nl/books/download/De_eerste_biechtmoeder-sample-epub.acsm?id=XcsvAgAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
},
"pdf": {
"isAvailable": true,
"acsTokenLink": "http://books.google.nl/books/download/De_eerste_biechtmoeder-sample-pdf.acsm?id=XcsvAgAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
},
"webReaderLink": "http://play.google.com/books/reader?id=XcsvAgAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
"accessViewStatus": "SAMPLE",
"quoteSharingAllowed": false
},
"searchInfo": {
"textSnippet": "De Eerste Biechtmoeder – De Legende van Magda Searus Met de elf boeken omvattende serie De Wetten van de Magie wist Terry Goodkind wereldwijd miljoenen lezers aan zich te binden."
}
},

*/