const mongoose = require('mongoose');
const { dateTimeKey, dateTimeGenerator, timestamp } = require('../tools/schema-temp');

const daftSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    daftList: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    ...dateTimeKey
},
    timestamp
)

dateTimeGenerator(daftSchema);

module.exports = mongoose.model('daft', daftSchema);