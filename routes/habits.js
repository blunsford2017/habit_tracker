// require module
const express = require('express');

// create router object
const router = express.Router();

// require habit controller
const habitCtrl = require('../controllers/habits');

// define route new habit
router.get('/new', habitCtrl.new);
// define route for create
router.post('/index', habitCtrl.create);
// define route to see list
router.get('/', habitCtrl.index);


// export router object
module.exports = router;