const mongoose = require('mongoose');
const { dateTimeGenerator, dateTimeKey, timestamp } = require('./../tools/schema-temp');

const memberSchema = new mongoose.Schema({
    username: {
        type: String,
        default: null,
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    ...dateTimeKey
},
    timestamp
)

dateTimeGenerator(memberSchema);

const generateId = async () => {
    const username = Math.random().toString(32).slice(2);
    const usernameExist = await memberModel.findOne({ username });

    if (usernameExist) generateId();

    return username;
}

memberSchema.pre('save', async function () {
    if (this.isNew) this.username = await generateId();
})

const memberModel = mongoose.model('member', memberSchema);

module.exports = memberModel;