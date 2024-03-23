"use strict";

const sanitizeHtml = require("sanitize-html");

const initializeOptions = (options) => {
  const sanitizerOptions = {};
  if (Array.isArray(options.allowedTags) && options.allowedTags.length > 0) {
    sanitizerOptions.allowedTags = options.allowedTags;
  }
  return {
    allowedKeys:
      (Array.isArray(options.allowedKeys) && options.allowedKeys) || [],
    sanitizerOptions,
  };
};

function containsAllowedKey(item, allowedKeys) {
  for (const key of allowedKeys) {
    const regex = new RegExp(key.replace(/\./g, '\\.').replace(/\*/g, '.*').replace(/%/g, '.*'));
    if (regex.test(item)) {
      return true;
    }
  }
  return false;
}

const detectXss = (value) => {
  try {
    const input = value.length;
    const inputAfterSanitizing = sanitizeHtml(value).length;
    if (input !== inputAfterSanitizing) {
      return true;
    }
  } catch (error) {
  }
  return false;
}

const sanitize = (options, data) => {
  if (typeof data === "string") {
    if(options?.allowedKeys?.includes(data)){
      return data;
    }
    return sanitizeHtml(data, options.sanitizerOptions);
  }
  if (Array.isArray(data)) {
    return data.map((item) => {
      if (typeof item === "string") {
        return sanitizeHtml(item, options.sanitizerOptions);
      }
      if (Array.isArray(item) || typeof item === "object") {
        return sanitize(options, item);
      }
      return item;
    });
  }
  if (typeof data === "object" && data !== null) {
    Object.keys(data).forEach((key) => {
      if (options.allowedKeys.includes(key)) {
        return;
      }
      if(options?.allowedKeys && containsAllowedKey(data[key], options.allowedKeys)){
        return data[key];
      }
      const item = data[key];
      if (typeof item === "string") {
        data[key] = sanitizeHtml(item, options.sanitizerOptions);
      } else if (Array.isArray(item) || typeof item === "object") {
        data[key] = sanitize(options, item);
      }
    });
  }
  return data;
};

const prepareSanitize = (data, options = {}) => {
  options = initializeOptions(options);
  return sanitize(options, data);
};

module.exports = {
  prepareSanitize,
  detectXss
};