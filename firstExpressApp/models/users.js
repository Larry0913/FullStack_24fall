const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
    name: { type: String, required: true},
    username: { type: String, required: true},
    location: String,
    bio: String,
    avatarUrl: { type: String, degault: "https://placehold.co/600x400/EEE/31343C"}
});

const UsersModel = mongoose.model("Users", UserModelSchema);

module.exports = UsersModel;