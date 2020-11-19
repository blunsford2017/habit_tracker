const mongoose = require('mongoose');


// shortcut to mongoose.connection object
const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

db.on('connected', function () {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});