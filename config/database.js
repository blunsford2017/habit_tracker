// mongodb+srv://admin:Drake90!@cluster0.d9j63.mongodb.net/habit_tracker?retryWrites=true&w=majority

const mongoose = require('mongoose');

const connectionURI = 'mongodb+srv://admin:Drake90!@cluster0.d9j63.mongodb.net/habit_tracker?retryWrites=true&w=majority'


// shortcut to mongoose.connection object
const db = mongoose.connection;

mongoose.connect(connectionURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

db.on('connected', function () {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});