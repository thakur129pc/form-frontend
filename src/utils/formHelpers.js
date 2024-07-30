// Helper function to flatten the object
export const flattenObject = (obj, parent = "", res = {}) => {
  for (let key in obj) {
    let propName = parent ? `${parent}.${key}` : key;
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
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
