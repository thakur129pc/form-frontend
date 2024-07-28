import apiClient from "../../utils/axios";

export const registerUser = async (params) => {
  try {
    const result = await apiClient.post("/register", params, {
      headers: {
        skipAuth: true,
      },
    });
    console.log(result);
    return result.data;
  } catch (error) {
    console.log(error);
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
