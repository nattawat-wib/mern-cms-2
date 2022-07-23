const mongoose = require('mongoose');
const { dateTimeGenerator, dateTimeKey, timestamp } = require('./../tools/schema-temp');

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true
    },
    banner: {
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
    contentTh: {
        type: String,
        required: true
    },
    contentEn: {
        type: String,
        required: true
    },
    tag: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'tag',
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    url: {
        type: String,
        required: true
    },
    clap: {
        type: Number,
        default: 0,
        required: true
    },
    ...dateTimeKey,
}, timestamp);

dateTimeGenerator(postSchema);

module.exports = mongoose.model('post', postSchema);