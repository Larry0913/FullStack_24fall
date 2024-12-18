var express = require('express');
var router = express.Router();
const Users = require('../models/users')

// automatically generate salt
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('userJson', function(req, res, next) {
  Users.find()
  .then(users => {
    res.json(users)
  })
  .catch(err => {
    console.log(err)
  })
});

router.post('/signup', async (req, res) => {
  const { email_address, password } = req.body;

  // Validate input
  if (!email_address || !password) {
    return res.status(400).send('Email and password are required.');
  }

  try {
    // Check for existing user
    const existingUser = await Users.findOne({ email_address });
    if (existingUser) {
      return res.status(400).send('Email already in use.');
    }

    // Generate salt and hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new Users({
      email_address,
      password: hashedPassword,
    });

    await user.save();
    res.send('Successfully signed up!');
  } catch (err) {
    res.status(500).send('Error signing up: ' + err.message);
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { email_address, password } = req.body;

  // Validate input
  if (!email_address || !password) {
    return res.status(400).send('Email and password are required.');
  }

  try {
    // Find the user by email
    const user = await Users.findOne({ email_address });
    if (!user) {
      return res.status(400).send('User not found.');
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid password.');
    }

    const token = jwt.sign(
      { username: user.username },  // Payload (data to be included in the token)
      process.env.JWT_SECRET,       // Secret key used for signing
      { expiresIn: "1h" }           // Token expiration time
    );
    

    // Successful login
    res.json(`Login successful! Welcome ${email_address}`, token);
  } catch (err) {
    res.status(500).send('Server error: ' + err.message);
  }
});




module.exports = router;
