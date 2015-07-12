var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Schema       = mongoose.Schema;
mongoose.connect('mongodb://admin:admin@ds033601.mongolab.com:33601/react_proj'); // connect to our database

//var User     = require('./app/models/users');
//var Link     = require('./app/models/links');

var LinksSchema   = new Schema({
    from: String,
    to: String
});

var UsersSchema   = new Schema({
    name: String,
    imports: Array
});

Users = mongoose.model('Users', UsersSchema);
Links = mongoose.model('Links', LinksSchema);

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
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/students')
    .get(function(req, res) {
        //Users.find({'rank': '1'}, "_id name").populate('imports.from').exec(function(err, users) {
        //    if (err)
        //        res.send(err);
        //
        //    res.json(users);
        //});

        Users.find({'rank': '1'}, "_id name",function(err, users) {
            if (err)
                res.send(err);

            users.forEach(function(user, index){
                Links.find({ from: user._id }, function(err, links) {
                    var obj = user.toObject();
                    obj['imports'] = links.map(function(link){
                        return link.to
                    });
                    res.write(JSON.stringify(obj));
                });
            });

            //res.end();
        });

        setTimeout(function(){res.end();}, 1000); // IM SORRY, THERE IS NO TIME
    });

router.route('/users/:user_id')
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
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