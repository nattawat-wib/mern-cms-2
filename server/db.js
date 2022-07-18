const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.MONGO_LOCAL)
    .then(() => {
        console.log('connect db successfully');
    })
    .catch(err => {
        console.log(`ERROR: cannot connect to db ${err}`);
    })