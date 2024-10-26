var express = require('express');
var router = express();

let data = [];

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'Welcome to larry Express assignment!' 
  });
});

router.get('/tweet', (req, res, next) => {
  res.render('index', { 
    title: 'Tweet', 
    contents: 'Show tweets'
  });
});

router.post('/', (req, res, next) => {
  console.log(req.body);
  data.push(req.body);
  res.render('index', { 
    id: data[0].id,
    title: data[0].title, 
    content: data[0].content
  });
});

router.get('/tweet/:id', (req, res, next) => {
  res.render('index', { 
    title: 'tweet', 
    contents: `delete a tweet id ${req.params.id}`
  });
});


module.exports = router;
