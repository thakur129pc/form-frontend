import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import formSlice from "./slices/formSlice";

const rootReducer = combineReducers({
  userSlice: userSlice,
  formSlice: formSlice,
});

export default rootReducer;
