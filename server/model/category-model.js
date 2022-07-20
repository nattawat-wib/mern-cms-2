const mongoose = require('mongoose');
const { dateTimeGenerator, timestamp, dateTimeKey } = require('../tools/schema-temp');

const categorySchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    ...dateTimeKey
},
    timestamp
)

dateTimeGenerator(categorySchema)

module.exports = mongoose.model('category', categorySchema);