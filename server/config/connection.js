const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://samandeepkaur34:TPhQbQ3nF1nSCVf8@bookserach.jjlvz.mongodb.net/?retryWrites=true&w=majority&appName=bookSerach');

module.exports = mongoose.connection;
