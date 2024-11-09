var express = require('express');
var router = express.Router();
const Users = require('../models/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  const allUsers = Users.find({ })
    .then(user => {
      // console.log(user);
      res.send(user);
    })
    .catch(err => {
      console.log(err);
    });
  console.log(allUsers);
});

module.exports = router;
