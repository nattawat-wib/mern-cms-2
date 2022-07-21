const mongoose = require('mongoose');
const { dateTimeGenerator, timestamp, dateTimeKey } = require('../tools/schema-temp');

const tagSchema = new mongoose.Schema({
    nameTh: {
        type: String,
        required: true
    },
    nameEn: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    titleTh: {
        type: String,
        required: true
    },
    titleEn: {
        type: String,
        required: true
    },
    descTh: {
        type: String,
        required: true
    },
    descEn: {
        type: String,
        required: true
    },
    ...dateTimeKey
},
    timestamp
)

dateTimeGenerator(tagSchema)

module.exports = mongoose.model('tag', tagSchema);