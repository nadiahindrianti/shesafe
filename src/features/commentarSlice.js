import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Thunk untuk mendapatkan kategori
export const fetchCommentar = createAsyncThunk(
  "commentar/fetchCommentar",
  async ({ id, page, perPage }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/community/commentar/${id}`,
        {
          params: {
            page,
            perPage,
          },
        }
      );

      return {
        commentar: response.data.commentar || [],
        pagination: response.data.pagination || {
          total_data: 0,
          per_page: 6,
          current_page: 1,
          total_pages: 1,
        },
      };
    } catch (error) {
      console.error("Error fetching comments:", error);
      return rejectWithValue("Failed to fetch comments.");
    }
  }
);

// Thunk untuk menambahkan komentar
export const postCommentar = createAsyncThunk(
  "commentar/postCommentar",
  async ({ casesID, description }) => {
    const response = await axios.post(
      `${API_BASE_URL}/community/commentar/${casesID}`,
      {
        description,
      }
    );
    return response.data.commentar || {};
  }
);

//thunk untuk delete
export const deleteComment = createAsyncThunk(
  "commentar/deleteComment",
  async ({ _id, casesID }) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/community/commentar/${casesID}`,
        {
          data: { _id },
        }
      );
      return response.data.commentar || {};
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  }
);

// Slice untuk komunitas
const commentarSlice = createSlice({
  name: "commentar",
  initialState: {
    loading: false,
    error: null,
    commentar: [],
    pagination: {
      total_data: 0,
      per_page: 6,
      current_page: 1,
      total_pages: 1,
    },
  },
  reducers: {
    resetCommentar: (state) => {
      state.commentar = [];
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
      .addCase(fetchCommentar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentar.fulfilled, (state, action) => {
        state.loading = false;

        state.commentar = action.payload?.commentar || [];
        state.pagination = action.payload?.pagination || {
          total_data: 0,
          per_page: 6,
          current_page: 1,
          total_pages: 1,
        };
      })
      .addCase(fetchCommentar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.commentar = [];
      })
      .addCase(postCommentar.fulfilled, (state, action) => {
        state.loading = false;
        state.commentar = action.payload || [];
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.commentar = action.payload || [];
      });
  },
});
export const { resetCommentar } = commentarSlice.actions;
export default commentarSlice.reducer;
