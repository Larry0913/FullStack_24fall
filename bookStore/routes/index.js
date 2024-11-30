var express = require('express');
var router = express();
var fs = require('fs');
var path = require('path');
const Books = require('../models/books')



let cats = [
    {
      "id": "g7",
      "url": "https://cdn2.thecatapi.com/images/g7.jpg",
      "width": 534,
      "height": 800
    },
    {
      "id": "2ap",
      "url": "https://cdn2.thecatapi.com/images/2ap.jpg",
      "width": 333,
      "height": 500
    },
    {
      "id": "8a4",
      "url": "https://cdn2.thecatapi.com/images/8a4.jpg",
      "width": 750,
      "height": 499
    },
    {
      "id": "9h7",
      "url": "https://cdn2.thecatapi.com/images/9h7.jpg",
      "width": 640,
      "height": 480
    },
    {
      "id": "beq",
      "url": "https://cdn2.thecatapi.com/images/beq.jpg",
      "width": 500,
      "height": 333
    },
    {
      "id": "blq",
      "url": "https://cdn2.thecatapi.com/images/blq.jpg",
      "width": 484,
      "height": 601
    },
    {
      "id": "bna",
      "url": "https://cdn2.thecatapi.com/images/bna.jpg",
      "width": 900,
      "height": 600
    },
    {
      "id": "bqf",
      "url": "https://cdn2.thecatapi.com/images/bqf.jpg",
      "width": 650,
      "height": 488
    },
    {
      "id": "MTgyNDE3NA",
      "url": "https://cdn2.thecatapi.com/images/MTgyNDE3NA.jpg",
      "width": 720,
      "height": 720
    },
    {
      "id": "zXYdWjjy4",
      "url": "https://cdn2.thecatapi.com/images/zXYdWjjy4.jpg",
      "width": 750,
      "height": 750
    }
];


router.get('/cats', (req, res, next) => {
  res.json(cats);
})

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
