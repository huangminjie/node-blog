var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var typeSchema = new Schema({
    name: String,
    status: Number,
    create_time: { type: Date, default: Date.now },
});

var Type = mongoose.model('Type', typeSchema);

module.exports = Type;
