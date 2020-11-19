// require user module
const User = require('../models/user');
// require the bcrypt module
const bcrypt = require('bcrypt');
// create a const var to store salt rounds
const SALT_ROUNDS = 10;



module.exports = {
    new:newUser,
    signUp, 
    signIn,
    signOut,
    login,
    profile,
};

function newUser(req, res) {
    res.render('/new');
};

function signUp(req, res) {
    // hash the user's password
    req.body.password = bcrypt.hashSync(
        req.body.password, 
        bcrypt.genSaltSync(SALT_ROUNDS));
    
    // save the user with the hased password
    User.create(req.body, function(err, newUser) {
        // redirectback to the home route
        console.log(newUser);
        res.redirect('/');
    });
};

function signIn(req, res) {
    res.render('/login');
};

function signOut(req, res) {
    //destroy the session
    req.session.destroy(function(err){
        // delete req.user
        delete req.user;
        // redirect home
        res.redirect('/');
    });
};

function login(req, res) {
    // fin the user in data base - we need to seeif they exsist
    user.findOne({username: req.body.username}, function(err, foundUser) {
        if(foundUser === null){
            // if they don't exsist - redirect back to login
            res.redirect('/signin');
        } else {
            // if they do exsist - compare the password, is it a match?
            const isMatched = bcrypt.compareSync(req.body.password, foundUser.password);
            // if the password matches - login them in
            if (isMatched) {
                //      add the user to a new session
                req.session.userId = foundUser._id;
                //      redirect to a secure location
                res.redirect('/profile');
            } else {
                // if the password is wrong - redirect back to login
                res.redirect('/signin');
            }
        }
    })
    
};

function profile(req, res) {
    res.render('/profile');
};