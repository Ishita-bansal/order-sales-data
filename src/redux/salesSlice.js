import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
   salesData : []
};

const SalesSlice = createSlice({
  initialState: initialValues,
  name: "sales",
  reducers: {
    salesReducer: (state, action) => {
      console.log("action====>",action);
      state.salesData = action?.payload.salesData;
    }
  },
});

export const {salesReducer } = SalesSlice.actions;
export default SalesSlice;
