const mongoose = require('mongoose');
const { dateTimeGenerator, dateTimeKey, timestamp } = require('./../tools/schema-temp');
const bcrypt = require('bcrypt');

const memberSchema = new mongoose.Schema({
    username: {
        type: String,
        default: null,
    },
    name: {
        type: String,
        required: true
    },
    email: {
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
    accessToken : {
        type: String
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
    
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
})

memberSchema.methods.isPasswordCorrect = async (plain, hash) => {
    return await bcrypt.compare(plain, hash);
}

const memberModel = mongoose.model('member', memberSchema);

module.exports = memberModel;