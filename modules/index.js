const nosql_injection = require('./nosql_injection');
const sql_injection = require('./sql_injection');
const xss_sanitize = require('./xss_sanitize');

const prepareSanitize = (data, options = { xss: true, sql: false, noSql: false, sqlLevel: 5, noSqlLevel: 5 }) => {
    if (options.xss)
        data = xss_sanitize(data, options)
    if (options.noSql)
        data = nosql_injection(data, options.noSqlLevel);
    if (options.sql)
        data = sql_injection(data, options.sqlLevel);

    return data;
};

module.exports = prepareSanitize;