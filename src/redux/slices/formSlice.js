import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  formData: {
    step1: {},
    step2: {},
    step3: {},
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { step, data } = action.payload;
      state.formData[step] = data;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
    clearData: (state) => {
      (state.currentStep = 1),
        (state.formData = {
          step1: {},
          step2: {},
          step3: {},
        });
    },
  },
});

export const { updateFormData, nextStep, prevStep, clearData } =
  formSlice.actions;

export default formSlice.reducer;
