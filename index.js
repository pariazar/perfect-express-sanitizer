const sanitize = require('./modules/');

function middleware(options = {}, whiteList = [], only = ["body", "params", "headers", "query"]) {
    return (req, res, next) => {
        only.forEach((k) => {
            if (req[k] && !whiteList.some(v => req.url.trim().includes(v))) {
                req[k] = sanitize.prepareSanitize(req[k], options);
            }
        });
        next();
    };
}

module.exports = {
    clean: middleware,
    sanitize
};