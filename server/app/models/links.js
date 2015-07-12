var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LinkSchema   = new Schema({
    from: {type: Schema.Types.ObjectId, ref: 'User' },
    to: {type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Links', LinkSchema);