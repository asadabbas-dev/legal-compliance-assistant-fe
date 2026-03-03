import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import anonymousService from "./anonymous.service";

const generalState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  data: null,
};

const initialState = {
  token: generalState,
};

export const fetchAnonymousToken = createAsyncThunk(
  "anonymous/token",
  async ({ successCallBack }, thunkAPI) => {
    try {
      const response = await anonymousService.getAnonymousToken();
      if (response.access_token) {
        // Store token in localStorage for session persistence
        if (typeof window !== "undefined") {
          window.localStorage.setItem("rag_access_token", response.access_token);
        }
        successCallBack?.(response);
        return response;
      }
      return thunkAPI.rejectWithValue({ message: "No access token received" });
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || { message: error.message });
    }
  }
);

export const anonymousSlice = createSlice({
  name: "anonymous",
  initialState,
  reducers: {
    resetToken: (state) => {
      state.token = generalState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnonymousToken.pending, (state) => {
        state.token.isLoading = true;
        state.token.message = "";
        state.token.isError = false;
        state.token.isSuccess = false;
        state.token.data = null;
      })
      .addCase(fetchAnonymousToken.fulfilled, (state, action) => {
        state.token.isLoading = false;
        state.token.isSuccess = true;
        state.token.data = action.payload;
      })
      .addCase(fetchAnonymousToken.rejected, (state, action) => {
        state.token.message = action.payload?.message || "Failed to get anonymous token";
        state.token.isLoading = false;
        state.token.isError = true;
        state.token.data = null;
      });
  },
});

export const { resetToken } = anonymousSlice.actions;
export default anonymousSlice.reducer;