// require the user model
const User = require('../models/user');

// set up modle.exports
module.exports = {
    addUserToRequest,
    isAuthenticated,
}

// a function to add the user to a property called user on the requests object
// aka req.user
function addUserToRequest(req, res, next) {
    // check if user is added to request
if (req.user) return next(); 
    // check to see if there is a session created
    if(req.session && req.session.userId){
        // find the user based on there id and then add them to the request object
        User.findById(req.session.userId, function(err, foundUser) {
            req.user = foundUser;
            next();
        });
    } else {
        next();
    };
};

// a function to check if a user is authenticated
function isAuthenticated(req, res, next) {
    if (req.user) return next(); //there is an authenticated user
    res.redirect('/users/signin'); //send them to the login page
}

// bycrpyt here
// Require bcrypt
const bcrypt = require('bcrypt');

// Store the number of salt rounds
const SALT_ROUNDS = bcrypt.genSaltSync(10);

// Password
const password = 'abc1234d';

// how we hash our password
const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
