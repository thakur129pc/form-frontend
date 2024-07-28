import apiClient from "../../utils/axios";
import Cookies from "js-cookie";

export const loginUser = async (params) => {
  try {
    const payload = {
      username: params.username,
      password: params.password,
    };
    const result = await apiClient.post("/login", payload, {
      headers: {
        skipAuth: true,
      },
    });
    if (result.status === 200) {
      const { accessToken } = result.data.user;
      Cookies.set("accessToken", accessToken, { expires: 1 });
    }
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
