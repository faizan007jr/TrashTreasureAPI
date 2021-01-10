const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017';//'mongodb+srv://admin:admin1@cluster0-ucnfp.mongodb.net/admin?retryWrites=true&w=majority';
mongoose.connect(dbURI, {dbName: 'TreasureDB', useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to TreasureDB`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

require("./treasure");