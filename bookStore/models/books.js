const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const BookModelSchema = new Schema({
    title: { type: String, required: true},
    author: { type: String, required: true},
    publishedDate: { type: Date },
    page: {type: Number}
});

const BooksModel = mongoose.model("Books", BookModelSchema);

module.exports = BooksModel;