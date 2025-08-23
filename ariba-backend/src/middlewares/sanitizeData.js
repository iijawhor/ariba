import sanitizeHtml from "sanitize-html";
export const sanitizeRequests = (req, res, next) => {
  const sanitizationOptions = {
    allowedTags: [],
    allowedAttributes: [],
    nonTextTags: []
  };

  try {
    function sanitizeData(data) {
      if (typeof data === "string") {
        return sanitizeHtml(data, sanitizationOptions);
      }

      if (Array.isArray(data)) {
        return data.map((data) => sanitizeData(data));
      }
      if (data && typeof data === "object") {
        for (let key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            data[key] = sanitizeData(data[key]);
          }
        }
        return data;
      }
      return data;
    }
    sanitizeData(req.params);
    sanitizeData(req.query);
    sanitizeData(req.body);
    next();
  } catch (error) {
    next(error.message);
  }
};
