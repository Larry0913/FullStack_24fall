const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const TweetsSchema = new Schema({
    content: { type: String, required: true},
    ImageUrl: String,
    // author: { 
    //     name: { type: String, required: true},
    //     username: { type: String, required: true},
    //     location: {type: String},
    //     bio: { type: String},
    //     avatarUrl: {type: String, default: "https://placehold.co/600x400/EEE/31343C"}
    // },

    author:{type: Schema.Types.OjectId, ref: 'Users'},
    CreatAt: { type: Date, required:true, default: Date.now}
});

const TweetsModel = mongoose.model("Tweets", TweetsSchema);

module.exports = TweetsModel;