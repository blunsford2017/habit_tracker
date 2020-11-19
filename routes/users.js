const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');

const authorization = require('../utils/authorization');

router.get('/new', userCtrl.new);

router.post('/signup', userCtrl.signUp);

router.get('/signin', userCtrl.signIn);

router.get('/signout', userCtrl.signOut);

router.post('/login', userCtrl.login);

router.get('/profile', authorization.isAuthenticated, userCtrl.profile);

module.exports = router;