const fs = require("fs");
const nosql_injection = require("./nosql_injection");
const sql_injection = require("./sql_injection");
const xss_sanitize = require("./xss_sanitize");
const custom_sanitize = require("./custom_injection");

const prepareSanitize = (
  data,
  options = {
    xss: true,
    sql: false,
    noSql: false,
    sqlLevel: 5,
    noSqlLevel: 5,
    forbiddenTags: [],
    level,
    allowedKeys: [],
    customizeFile
  }
) => {
  if (options.level) {
    options.sqlLevel = options.level;
    options.noSqlLevel = options.level;
  }
  let forbiddenTags = options.forbiddenTags;
  if(options.customizeFile){
    try {
      const fileData = fs.readFileSync(options.customizeFile, "utf8");
      const jsonData = JSON.parse(fileData);
      if(!Array.isArray(jsonData)){
        console.error("Error invalid structure: file need array of keywords");
      }
      options.forbiddenTags = jsonData.map((wd)=> wd.keyword);
      options.hasFile = true;
      data = custom_sanitize.prepareSanitize(data, options);
      options.forbiddenTags = forbiddenTags;
    } catch (error) {
      console.error("Error reading or parsing customize file:", error);
    }
  }
  if (forbiddenTags){
    options.hasFile = false;
    data = custom_sanitize.prepareSanitize(data, options);
  }
  if (options.xss) data = xss_sanitize.prepareSanitize(data, options);
  if (options.noSql)
    data = nosql_injection.prepareSanitize(data, options);
  if (options.sql) data = sql_injection.prepareSanitize(data, options);

  return data;
};

module.exports = {
  prepareSanitize,
  detectXss: xss_sanitize.detectXss,
  detectSqlInj: sql_injection.detectSqlInjection,
  detectNoSqlInj: nosql_injection.detectNoSqlInjection,
};
