// require the modle
const Habit = require('../models/habit');

// set up module.exports and set up new action
module.exports = {
    new:newHabit,
    create,
    index,
    edit,
    delete: deletehabit,
};

// define new action
function newHabit(req, res){
    res.render('habits/new');
};

// define create new action
function create(req, res) {
    // create habit object
    const habit = new Habit(req.body);

    habit.save(function(err) {
        console.log(habit)
        // after habit created redirect
        res.redirect('/habits/index');
    });
};

// define seeing all habits
function index(req, res) {
    // querery model for all habits
    Habit.find({}, function(err, habits) {
        // render template for all habit
        res.render('habits/index', {habits});
    });
};

// update a habit
function edit(req, res) {
    Habit.findById(req.params.id, function(err, habit) {
      // Verify habit is "owned" by logged in user
      if (!habit.user.equals(req.user._id)) return res.redirect('/habits');
      res.render('habits/edit', {habit});
    });
  }

// Delete habit
function deletehabit(req, res) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    Habit.findOne({'habits._id': req.params.id}, function(err, habits) {
      // Find the habit subdoc using the id method on Mongoose arrays
      // https://mongoosejs.com/docs/subdocs.html
      const habitSubdoc = habits.habits.id(req.params.id);
      // Ensure that the habit was created by the logged in user
      if (!habitSubdoc.userId.equals(req.user._id)) return res.redirect(`/habits/${habits._id}`);
      // Remove the habit using the remove method of the subdoc
      habitSubdoc.remove();
      // Save the updated habits
      habits.save(function(err) {
        // Redirect back to the habits's show view
        res.redirect(`/habits/${habits._id}`);
      });
    });
  }