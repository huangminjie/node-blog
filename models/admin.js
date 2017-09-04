var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    user_name: String,
    password: String,
    avatara: String,
    description: String,
    create_time: { type: Date, default: Date.now },
});

var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
