import apiClient from "../../utils/axios";
import { convertToFormData } from "../../utils/formHelpers";

export const registerUser = async (params) => {
  const formData = convertToFormData(params);
  try {
    const result = await apiClient.post("/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        skipAuth: true,
      },
    });
    return result.data;
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      return data;
    } else {
      const data = {
        success: false,
        message: "Internal server error. Please try again later.",
      };
      return data;
    }
  }
};
