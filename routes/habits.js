// require module
const express = require('express');

// create router object
const router = express.Router();

// require habit controller
const habitCtrl = require('../controllers/habits');
const habit = require('../models/habit');

// define route new habit
router.get('/new', habitCtrl.new);
// define route for create
router.post('/index', habitCtrl.create);
// define route to see list
router.get('/index', habitCtrl.index);
//define route to update
router.get('/:id/edit', habitCtrl.edit);
router.put('/:id', habitCtrl.update)
//define route to delete
router.delete('/:id', habitCtrl.delete);

// export router object
module.exports = router;
