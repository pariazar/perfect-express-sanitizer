const nosql_injection = require('./nosql_injection');
const sql_injection = require('./sql_injection');
const xss_sanitize = require('./xss_sanitize');

const prepareSanitize = (data, options = { xss: true, sql: false, noSql: false, sqlLevel: 5, noSqlLevel: 5, level }) => {
    if (options.level){
        options.sqlLevel = options.level;
        options.noSqlLevel = options.level;
    }
    if (options.xss)
        data = xss_sanitize.prepareSanitize(data, options)
    if (options.noSql)
        data = nosql_injection.prepareSanitize(data, options.noSqlLevel);
    if (options.sql)
        data = sql_injection.prepareSanitize(data, options.sqlLevel);

    return data;
};

module.exports = {
    prepareSanitize,
    detectXss: xss_sanitize.detectXss,
    detectSqlInj: sql_injection.detectSqlInjection,
    detectNoSqlInj: nosql_injection.detectNoSqlInjection,
};