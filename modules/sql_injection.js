const sqlLimits = require('../data/sql.js');
function hasSqlInjection(value, level) {
  const limits = sqlLimits.filter((item) => {
    if (item.level <= level) {
      return item.regex
    }
  });
  const limitsRegex = limits.map((item) => item.regex);
  limitsRegex.forEach(item => {
    value = value.replace(new RegExp(item, 'ig'), '');
  });

  return value;
}

const detectSqlInjection = (value, level = 5) => {
  const limits = sqlLimits.filter((item) => {
    if (item.level <= level) {
      return item.regex
    }
  });
  const limitsRegex = limits.map((item) => item.regex);
  let result = false;
  limitsRegex.forEach(item => {
    try {
      if ((new RegExp(item)).test(value) && !item.includes('||') && !item.includes('/*')) {
        result = true;
      }
    } catch (error) {
      // console.log(error);
    }
  });
  return result;
}

const sanitize = (data, level) => {
  if (typeof data === "string") {
    return hasSqlInjection(data, level);
  }
  if (Array.isArray(data)) {
    return data.map((item) => {
      if (typeof item === "string") {
        return hasSqlInjection(item, level);
      }
      if (Array.isArray(item) || typeof item === "object") {
        return sanitize(data, level);
      }
      return item;
    });
  }
  if (typeof data === "object" && data !== null) {
    Object.keys(data).forEach((key) => {
      const item = data[key];
      if (typeof item === "string") {
        data[key] = hasSqlInjection(item, level);
      } else if (Array.isArray(item) || typeof item === "object") {
        try {
          data[key] = sanitize(item, level);
        } catch (error) {
          data[key] = item;
        }
      }
    });
  }
  return data;
};

const prepareSanitize = (data, level = 5) => {
  return sanitize(data, level);
};
module.exports = {
  prepareSanitize,
  detectSqlInjection
};