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

function containsAllowedKey(item, allowedKeys) {
  for (const key of allowedKeys) {
    const regex = new RegExp(key.replace(/\./g, '\\.').replace(/\*/g, '.*').replace(/%/g, '.*'));
    if (regex.test(item)) {
      return true;
    }
  }
  return false;
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

const sanitize = (data, options) => {
  if(!options?.level) options.level = 5;
  const { level } = options;

  if (typeof data === "string") {
    if(options?.allowedKeys?.includes(data)){
      return data;
    }
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
    let sanitizedData = {};
    Object.keys(data).forEach((key) => {
      let item = data[key];
      if(options?.allowedKeys  && containsAllowedKey(item, options.allowedKeys)){
        sanitizedData[key] = item;
      }
      if (typeof item === "string") {
        sanitizedData[options.sanitizeKeys ? noSQLSanitizer(key, level) : key] = noSQLSanitizer(item, level);
      }
      else if(typeof item === "boolean" || typeof item === "number") {
        sanitizedData[key] = item
      }
       else if (Array.isArray(item) || typeof item === "object") {
        try {
          sanitizedData[options.sanitizeKeys ? noSQLSanitizer(key, level) : key] = sanitize(item, options);
        } catch (error) {
          sanitizedData[key] = item;
        }
      }
    });
    return sanitizedData;
  }
  return data;
};

const prepareSanitize = (data, options) => {
  return sanitize(data, options);
};
module.exports = {
  prepareSanitize,
  detectNoSqlInjection
};