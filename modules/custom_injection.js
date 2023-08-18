const removeDangerData = (value, options) =>
  options.forbiddenTags.reduce(
    (acc, item) => acc.replace(new RegExp(item, "ig"), "").trim(),
    value
  );

const sanitize = (data, keywords) => {
  if (typeof data === "string") {
    return removeDangerData(data, keywords);
  }
  if (Array.isArray(data)) {
    return data.map((item) => sanitize(item, keywords));
  }
  if (typeof data === "object" && data !== null) {
    return Object.entries(data).reduce((acc, [key, value]) => {
      acc[key] = sanitize(value, keywords);
      return acc;
    }, {});
  }
  return data;
};

const prepareSanitize = (data, keywords) => sanitize(data, keywords);

module.exports = { prepareSanitize };
