// require the modle
const Habit = require('../models/habit');

// set up module.exports and set up new action
module.exports = {
    new:newHabit,
    create,
    index,
};

// define new action
function newHabit(req, res){
    res.render('habits/new');
};

function create(req, res) {
    // create habit object
    const habit = new Habit(req.body);

    habit.save(function(err) {
        console.log(habit)
        // after habit created redirect
        res.redirect('/habits/index');
    });
};

function index(req, res) {
    // querery model for all habits
    Habit.find({}, function(err, habits) {
        // render template for all habit
        res.render('habits/index', {habits});
    });
};
