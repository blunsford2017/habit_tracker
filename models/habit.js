const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitSchema = new Schema({
    habit: String,
    month: String,
    dayName: String,
    dayNo: Number,
    note: String,
  });

  module.exports = mongoose.model('Habit', habitSchema);