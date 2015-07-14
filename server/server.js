var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Schema       = mongoose.Schema;
mongoose.connect('mongodb://admin:admin@ds033601.mongolab.com:33601/react_proj'); // connect to our database

//var User     = require('./app/models/users');
//var Link     = require('./app/models/links');

var LinksSchema   = new Schema({
    from:   [{ type: Schema.Types.ObjectId, ref: 'users' }],
    to:     [{ type: Schema.Types.ObjectId, ref: 'users' }]
});

var UsersSchema   = new Schema({
    name: String,
    links: [{ type: Schema.Types.ObjectId, ref: 'links' }]
});

Users = mongoose.model('users', UsersSchema);
Links = mongoose.model('links', LinksSchema);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/students')
    .get(function(req, res) {
        Users.find({'rank': '1'}, "name links").populate('links','to').lean().exec(function(err, ret_users) {
            if (err)
                res.send(err);

            Users.populate(ret_users, { path: 'links.to', select: 'name', model: 'users'}, function (err, users) {
                var ret = [];
                users.forEach(function(user, uindex){
                    user.userID = user['_id'];
                    delete user['_id'];
                    var links_arr = [];
                    if (user.links){
                        user.links.forEach(function(link, lindex){
                            links_arr.push(link.to.name);
                        });
                    }
                    user.links = links_arr;
                    ret.push(user);
                });
                res.json(ret);
            });
        });
    });

router.route('/users/:user_id')
    .get(function(req, res) {
        Users.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);