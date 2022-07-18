const sanitize = require('./modules/');

function middleware(options = {}, whiteList = []) {
    return (req, res, next) => {
        ["body", "params", "headers", "query"].forEach((k) => {
            if (req[k] && !whiteList.some(v => req.url.trim().includes(v))) {
                req[k] = sanitize(req[k], options);
            }
        });
        next();
    };
}

module.exports = {
    clean: middleware,
    sanitize,
};