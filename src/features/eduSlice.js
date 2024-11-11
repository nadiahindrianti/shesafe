import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Thunk untuk mendapatkan data pendidikan (edu)
export const fetchEdu = createAsyncThunk("edu/fetchEdu", async () => {
  const response = await axios.get(`${API_BASE_URL}/education/`, {
    withCredentials: true,
  });
  return response.data.data;
});

export const fetchEduById = createAsyncThunk("edu/fetchEduById", async (id) => {
  const response = await axios.get(`${API_BASE_URL}/education/${id}`, {
    withCredentials: true,
  });
  return response.data.findModule;
});

// Slice untuk edukasi (edu)
const eduSlice = createSlice({
  name: "edu",
  initialState: {
    loading: false,
    error: null,
    edu: [],
    // eduDetail: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchEdu handlers
      .addCase(fetchEdu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEdu.fulfilled, (state, action) => {
        state.loading = false;
        state.edu = action.payload;
      })
      .addCase(fetchEdu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // fetchEduById handlers
      .addCase(fetchEduById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEduById.fulfilled, (state, action) => {
        state.loading = false;
        state.edu = action.payload;
      })
      .addCase(fetchEduById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default eduSlice.reducer;
