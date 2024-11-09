var express = require('express');
var router = express();
var fs = require('fs');
var path = require('path');
const Books = require('../models/books')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET books json page. */
router.get('/booksjson', function(req, res, next) {
  // read bool.json file
  fs.readFile(path.join(__dirname, '../book.json'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading book data');
    }
    const books = JSON.parse(data);
    res.render('book', { books: books });
  });
});

// POST route to add a new book
router.post('/books', async (req, res) => {
  try {
    const book = await Books.create(req.body);
    res.send(book); 
  } catch (error) {
    res.send({ error: error.message });
  }
});

// GET route to fetch all books
// router.get('/books', async (req, res) => {
//   try {
//     const books = await Books.find();
//     res.status(200).json(books);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

/* GET books mongoDB data. */
router.get('/books', function(req, res, next) {
  const allBooks = Books.find()
    .then(book => {
      // console.log(user);
      res.send(book);
    })
    .catch(err => {
      console.log(err);
    });
  console.log(allBooks);
});


module.exports = router;
