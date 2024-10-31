var express = require('express');
var router = express();
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET books page. */
router.get('/books', function(req, res, next) {
  // read bool.json file
  fs.readFile(path.join(__dirname, '../book.json'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading book data');
    }
    const books = JSON.parse(data);
    res.render('book', { books: books });
  });
});


module.exports = router;
