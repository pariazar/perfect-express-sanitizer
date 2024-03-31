const sanitize = require("./modules/");

function middleware(
  options = {},
  whiteList = [],
  only = ["body", "params", "headers", "query"],
  dynamicRoutes = false
) {
  return (req, res, next) => {
    only.forEach((k) => {
      if (req[k] && !whiteList.some((v) => {
        if (dynamicRoutes && v.includes(':')) {
          let check = false;
          const vArr = v.replace(/^\/+/, '').replace(/\/$/, '').split('/');
          const urlArr = req.url.replace(/^\/+/, '').replace(/\/$/, '').split('/');

          if (vArr.length <= urlArr.length)
            for (let i = 0; i < vArr.length; i++) {
              if (vArr[i].includes(':'))
                check = true;
              else if (vArr[i] == urlArr[i]) check = true;
              else { check = false; break; }
            };
          return check
        }
        else return req.url.trim().startsWith(v)
      })) {
        req[k] = sanitize.prepareSanitize(req[k], options);
      }
    });
    next();
  };
}

module.exports = {
  clean: middleware,
  sanitize,
};
