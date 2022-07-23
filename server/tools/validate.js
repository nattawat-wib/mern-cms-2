const { resError } = require('./response');

exports.clean = (form, allowKeyList, notValidateKeyList = []) => {
    // clean only allow key
    for (const key in form) {
        if (!allowKeyList.includes(key)) delete form[key]
    }

    allowKeyList.forEach(key => {
        const value = form[key];

        if (typeof value === 'string') form[key] = value.trim();

        // if key is in not validate list don't want any check
        if (notValidateKeyList.includes(key)) {
            return
        }

        // if null. undefined, but not 0
        else if (!value && value !== 0) {
            resError(400, `${key} is require!`);
        }

        // if empty Array []
        else if (Array.isArray(value) && !value.length) {
            resError(400, `${key} is require!`)
        }

        // if empty Object {}
        else if (typeof value === 'object' && !Object.keys(value).length) {
            resError(400, `${key} is require!`)
        }
    })
}

exports.isExist = async (form, uniqueKey, model, checkKeyList) => {
    for (const key of checkKeyList) {
        let label = key;
        let query = {
            [key]: form[key],
            _id: { $ne: uniqueKey }
        };

        // if key is object format value
        if (typeof key === 'object' && key !== null && !Array.isArray(key)) {
            query = { key, _id: { $ne: uniqueKey } }
            label = Object.keys(key)[0];
        }

        if (await model.findOne(query)) {
            resError(400, `Duplicate Error: ${label} is already taken`)
        }
    }
}