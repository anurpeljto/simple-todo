class CustomError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}
const createNewCustomError = (msg, statusCode) => {
    return new CustomError(msg, statusCode);
}
module.exports = {createNewCustomError, CustomError};