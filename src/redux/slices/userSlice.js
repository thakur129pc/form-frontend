import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userDetails: (state, action) => {
      state.user = { ...action.payload };
    },
  },
});

export const { userDetails } = userSlice.actions;

export default userSlice.reducer;
