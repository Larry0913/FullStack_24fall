var express = require('express');
var router = express();

let data = [];

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'Welcome to larry Express assignment!' 
  });
});

// tweets return all tweets
router.get('/tweets', (req, res, next) => {
  res.json(data);
});

router.get('/tweet/:id', (req, res, next) => {
  const tweetId = parseInt(req.params.id, 10);
  const tweet = data.find(t => t.id === tweetId);
  if (!tweet) {
    return res.status(404).send("Tweet not found");
  }
  res.json(tweet);
});

router.post('/tweet', (req, res, next) => {
  console.log(req.body);
  data.push(req.body);
  res.render('index', { 
    id: req.body.id,
    message: req.body.message,
    author: req.body.author,
    createdAt: new Date().toISOString(),
  });
});

router.delete('/tweet/:id', (req, res, next) => {
  const tweetId = parseInt(req.params.id, 10);
  const tweetIndex = data.findIndex(t => t.id === tweetId);
  const deletedTweet = data.splice(tweetIndex, 1); // Remove tweet from the data array
  res.json({ message: 'Tweet deleted', deletedTweet }); // Confirm deletion and show deleted tweet

});


module.exports = router;
