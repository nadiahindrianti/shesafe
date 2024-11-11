import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Thunk untuk mendapatkan jurnal
export const fetchJournal = createAsyncThunk("case/fetchJournal", async () => {
  const response = await axios.get(`${API_BASE_URL}/journal/`, {
    withCredentials: true,
  });
  return response.data.data;
});

// Thunk untuk mengirimkan kasus
export const postCase = createAsyncThunk("case/postCase", async (dataCase) => {
  const response = await axios.post(`${API_BASE_URL}/cases/`, dataCase);
  return response.data;
});

// Thunk untuk menyimpan draft kasus
export const postCaseDraft = createAsyncThunk(
  "case/postCaseDraft",
  async (dataCase) => {
    const response = await axios.post(`${API_BASE_URL}/cases/draft`, dataCase);
    return response.data;
  }
);

export const editCase = createAsyncThunk(
  "case/postCase",
  async ({ id, dataCase }) => {
    const response = await axios.put(`${API_BASE_URL}/cases/${id}`, dataCase);
    return response.data;
  }
);

export const deleteCase = createAsyncThunk("case/postCase", async ({ id }) => {
  const response = await axios.delete(`${API_BASE_URL}/cases/${id}`);
  return response.data;
});

//ThunkDetail
// export const detailCase = createAsyncThunk("case/detailCase", async (id) => {
//   const response = await axios.post(`${API_BASE_URL}/cases/${id}`, dataCase);
//   return response.data.data;
// });

// Slice untuk komunitas
const casesSlice = createSlice({
  name: "case",
  initialState: {
    loading: false,
    error: null,
    journal: [],
    case: [], // Menyimpan semua data kasus termasuk draft
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchJournal handlers
      .addCase(fetchJournal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJournal.fulfilled, (state, action) => {
        state.loading = false;
        state.journal = action.payload;
      })
      .addCase(fetchJournal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // postCase handlers
      .addCase(postCase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCase.fulfilled, (state, action) => {
        state.loading = false;
        state.case = action.payload;
      })
      .addCase(postCase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // postCaseDraft handlers
      .addCase(postCaseDraft.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCaseDraft.fulfilled, (state, action) => {
        state.loading = false;
        state.case = action.payload;
      })
      .addCase(postCaseDraft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default casesSlice.reducer;
