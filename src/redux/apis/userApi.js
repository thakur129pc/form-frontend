import apiClient from "../../utils/axios";
import { userDetails } from "../slices/userSlice";

export const fetchUserDetails = () => async (dispatch) => {
  try {
    const response = await apiClient.post("/view-profile");
    dispatch(userDetails(response.data.user));
    return response.data;
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
