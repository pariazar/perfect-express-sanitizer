const mongoLimit = require('../data/mongo.js');
function noSQLSanitizer(input, level) {
  const limits = mongoLimit.filter((item) => {
    if (item.level <= level) {
      return item.keyword
    }
  });
  const keywords = limits.map((item) => item.keyword);

  keywords.forEach((keyword) => {
    input = input.replace(keyword, '');
  });
  return input;
}
const detectNoSqlInjection = (value, level = 5) => {
  const limits = mongoLimit.filter((item) => {
    if (item.level <= level) {
      return item.keyword
    }
  });
  const keywords = limits.map((item) => item.keyword);

  let result = false;
  keywords.forEach(item => {
    try {
      if (value.includes(item) && !item.includes('||') && !item.includes('/*')) {
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
    return noSQLSanitizer(data, level);
  }
  if (Array.isArray(data)) {
    return data.map((item) => {
      if (typeof item === "string") {
        return noSQLSanitizer(item, level);
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
        data[key] = noSQLSanitizer(item, level);
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
  detectNoSqlInjection
};