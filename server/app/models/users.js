var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Link         = require('./links');

var UserSchema   = new Schema({
    name: String,
    imports: [Link]
});

module.exports = mongoose.model('Users', UserSchema);