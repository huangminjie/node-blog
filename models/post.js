var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: String,
    type: String,
    digest: String,
    tag: String,
    text: String,
    status: Number,
    create_time: { type: Date, default: Date.now },
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
