// Helper function to flatten the object
export const flattenObject = (obj, parent = "", res = {}) => {
  for (let key in obj) {
    let propName = parent ? `${parent}.${key}` : key;

    if (Array.isArray(obj[key])) {
      obj[key].forEach((item, index) => {
        if (typeof item === "object" && !Array.isArray(item)) {
          flattenObject(item, `${propName}[${index}]`, res);
        } else {
          res[`${propName}[${index}]`] = item;
        }
      });
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      flattenObject(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};

// Function to convert the object to FormData
export const convertToFormData = (params) => {
  const formData = new FormData();
  const flattenedParams = flattenObject(params);

  for (const key in flattenedParams) {
    formData.append(key, flattenedParams[key]);
  }

  return formData;
};
