const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email_address: { type: String, required: true },      
    password: { type: String, required: true },     
  });

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;