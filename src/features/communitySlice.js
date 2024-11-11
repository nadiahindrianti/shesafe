import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

export const fetchCommunity = createAsyncThunk(
  "community/fetchCommunity",
  async ({ category, page, perPage, c }) => {
    const response = await axios.get(`${API_BASE_URL}/community`, {
      params: {
        category,
        page,
        perPage,
      },
    });
    // console.log("API Response:", response.data.data);
    // console.log("API Pagination:", response.data.pagination);
    return {
      community: response.data.data,
      pagination: response.data.pagination,
    };
  }
);

export const fetchSupport = createAsyncThunk(
  "community/fetchSupport",
  async (casesID) => {
    const response = await axios.get(
      `${API_BASE_URL}/community/support/${casesID}`
    );
    // console.log("API Response for fetchSupport:", response.data);
    return response.data.data;
  }
);

export const postSupport = createAsyncThunk(
  "community/postSupport",
  async ({ casesID, count }) => {
    const response = await axios.post(
      `${API_BASE_URL}/community/support/${casesID}`,
      {
        count,
      }
    );
    return response.data;
  }
);

export const deleteSupportById = createAsyncThunk(
  "community/deleteSupportById",
  async (casesID) => {
    const response = await axios.delete(
      `${API_BASE_URL}/community/support/${casesID}`
    );
    return response.data;
  }
);

export const detailCommunity = createAsyncThunk(
  "community/detailCommunity",
  async (id) => {
    const response = await axios.get(`${API_BASE_URL}/community/${id}`);
    return response.data.data;
  }
);

const communitySlice = createSlice({
  name: "community",
  initialState: {
    loading: false,
    error: null,
    community: [],
    support: [],
    pagination: {
      total_data: 0,
      per_page: 6,
      current_page: 1,
      total_pages: 1,
    },
  },
  reducers: {
    resetCommunity: (state) => {
      state.community = [];
      state.pagination = {
        total_data: 0,
        per_page: 6,
        current_page: 1,
        total_pages: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunity.fulfilled, (state, action) => {
        state.loading = false;
        state.community = action.payload.community || [];
        state.pagination = action.payload.pagination || {
          total_data: 0,
          per_page: 6,
          current_page: 1,
          total_pages: 1,
        };
      })
      .addCase(fetchCommunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(detailCommunity.fulfilled, (state, action) => {
        state.community = action.payload;
      })
      .addCase(fetchSupport.fulfilled, (state, action) => {
        state.loading = false;
        state.support = action.payload;
      })
      .addCase(postSupport.fulfilled, (state, action) => {
        state.loading = false;
        state.support = action.payload;
      })
      .addCase(deleteSupportById.fulfilled, (state, action) => {
        state.loading = false;
        state.support = action.payload;
      });
  },
});

export const { resetCommunity } = communitySlice.actions;
export default communitySlice.reducer;
