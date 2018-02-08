var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: String,
    type: Number,
    digest: String,
    tag: String,
    text: String,
    create_time: { type: Date, default: Date.now },
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
