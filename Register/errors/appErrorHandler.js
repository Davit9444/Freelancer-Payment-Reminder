const AppError = require('./AppError');

function appErrorHandler(err, req, res, next) {
    if(err instanceof AppError) {
        console.log('AppError', err);
        return res.status(err.code).send(err.message);
    }
    console.error(err);
    res.status(500).send('Somthing Went Wrong');
}

module.exports = appErrorHandler;