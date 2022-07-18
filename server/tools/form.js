const AppError = require('./app-error');

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
            throw new AppError(400, `${key} is require!`);
        }

        // if empty Array []
        else if (Array.isArray(value) && !value.length) {
            throw new AppError(400, `${key} is require!`)
        }

        // if empty Object {}
        else if (typeof value === 'object' && !Object.keys(value).length) {
            throw new AppError(400, `${key} is require!`)
        }
    })
}