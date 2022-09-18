import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false || localStorage.getItem("TOKEN") != null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.clear()
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const signupThunk =
  ({ username, password }) =>
  async (dispatch) => {
    console.log(username, password);
    let res = await axios.post(`${process.env.REACT_APP_BACKEND}/auth/signup`, {
      username,
      password,
    });
    if(res.data) {
      console.log(res.data);
      localStorage.setItem("TOKEN", res.data.token);
      dispatch(login());
    }
  };

export const loginThunk =
  ({ username, password }) =>
  async (dispatch) => {
    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/auth/login`,
      { username, password }
    );
    if (response.data) {
      console.log(response.data);
      localStorage.setItem("TOKEN", response.data.token);
      dispatch(login());
    }
  };

export const logoutThunk = () => async (dispatch) => {
  localStorage.removeItem("TOKEN");
  dispatch(logout());
};
