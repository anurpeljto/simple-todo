const {CustomError} = require('../errors/custom-error');

const errorHandler = (err, req, res, next) => {
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({error: err.message})
    }
    return res.status(500).json({error: 'Something went wrong'});
}

module.exports = errorHandler;