// require the modle
const Habit = require('../models/habit');

// set up module.exports and set up new action
module.exports = {
    new:newHabit,
    create,
    index,
    update,
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

// WORKING: update a habit
function update(req, res) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    Habit.findOne({'habits._id': req.params.id}, function(err, habit) {
      // Find the comment subdoc using the id method on Mongoose arrays
      // https://mongoosejs.com/docs/subdocs.html
      const habitSubdoc = habit.habits.id(req.params.id);
      // Ensure that the habit was created by the logged in user
      if (!habitSubdoc.userId.equals(req.user._id)) return res.redirect(`/habits/index${habit._id}`);
      // Update the text of the comment
      habitSubdoc.text = req.body.text;
      // Save the updated habit
      habit.save(function(err) {
        // Redirect back to the habit's show view
        res.redirect(`/habits/index`);
      });
    });
  };

//   TODO: Delete habit