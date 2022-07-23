const mongoose = require('mongoose');
const { dateTimeKey, dateTimeGenerator, timestamp} = require('../tools/schema-temp');

const savePostSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member'
    },
    postList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'post'
    },
    ...dateTimeKey
}, 
    timestamp
);

dateTimeGenerator(savePostSchema);

module.exports = mongoose.model('savePost', savePostSchema)