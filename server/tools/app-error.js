class AppError extends Error {
    constructor(statusCode, message) {
        super(message);

        this.statusCode = statusCode;
        this.status = String(statusCode).startsWith(4) ? 'error' : 'fail';
        this.isOperational = true

        // Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError