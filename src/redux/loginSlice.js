import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  email: "",
  password: "",
  isLoggedin: false,
};

const LoginSlice = createSlice({
  initialState: initialValues,
  name: "login",
  reducers: {
    loginReducer: (state, action) => {
      state.email = action?.payload?.email;
      state.password = action?.payload?.password;
      state.isLoggedin = action?.payload?.isLoggedin;
    },
    logoutReducer : (state) => {
      state.email="";
      state.password="";
      state.isLoggedin = false;
    }
  },
});

export const { loginReducer,logoutReducer } = LoginSlice.actions;
export default LoginSlice;
