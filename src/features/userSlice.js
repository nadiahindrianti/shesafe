import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const regist = createAsyncThunk("users/regist", async (dataUser) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      dataUser,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Terjadi kesalahan saat registrasi."
    );
  }
});

export const login = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Gagal login");
    }
  }
);

export const checkAuth = createAsyncThunk("users/checkAuth", async () => {
  const response = await axios.get(`${API_BASE_URL}/check`, {
    withCredentials: true,
  });
  return response.data;
});

export const logout = createAsyncThunk("users/logout", async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Gagal logout");
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoggedin: localStorage.getItem("isLoggedin") === "true",
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setLoginStatus(state, action) {
      state.isLoggedin = action.payload;
      localStorage.setItem("isLoggedin", action.payload); // Menyimpan status ke localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(regist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(regist.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(regist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        localStorage.setItem("isLoggedin", "true");
        state.isLoggedin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log("Check Auth Response:", action.payload);
        state.loading = false;
        state.isLoggedin = action.payload.isAuthenticated;
        state.userData = action.payload.user;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isLoggedin = false;
        localStorage.removeItem("isLoggedin");
      })
      //ini logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedin = false;
        state.userData = null;
        localStorage.removeItem("isLoggedin");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { setLoginStatus } = userSlice.actions;
export default userSlice.reducer;
