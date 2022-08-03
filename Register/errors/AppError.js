class AppError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
    static internalError(msg) {
        return new AppError(500, msg);
    }
    static appError(msg) {
        return new AppError(400, msg);
    }
}

module.exports = AppError;