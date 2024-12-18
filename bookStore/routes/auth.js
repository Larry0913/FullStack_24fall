const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user object
      const newUser = { username, password: hashedPassword };
  
      // Add the new user to the array
      users.save()
  
      // Respond with success message and the created user
      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (e) {
      console.log(e.message);
    }
  });

  

module.exports = { router, users };
