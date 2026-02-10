import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import documentsService from "./documents.service";

const generalState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  data: null,
};

const initialState = {
  upload: generalState,
  list: generalState,
};

export const uploadPdf = createAsyncThunk(
  "documents/upload",
  async ({ file, successCallBack }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await documentsService.uploadPdf(formData);
      if (response.success) {
        successCallBack?.(response);
        return response;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || { message: error.message });
    }
  }
);

export const fetchDocuments = createAsyncThunk(
  "documents/fetch",
  async ({ successCallBack }, thunkAPI) => {
    try {
      const response = await documentsService.getDocuments();
      if (response.success) {
        successCallBack?.(response);
        return response;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || { message: error.message });
    }
  }
);

export const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    resetUpload: (state) => {
      state.upload = generalState;
    },
    resetList: (state) => {
      state.list = generalState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPdf.pending, (state) => {
        state.upload.isLoading = true;
        state.upload.message = "";
        state.upload.isError = false;
        state.upload.isSuccess = false;
        state.upload.data = null;
      })
      .addCase(uploadPdf.fulfilled, (state, action) => {
        state.upload.isLoading = false;
        state.upload.isSuccess = true;
        state.upload.data = action.payload;
      })
      .addCase(uploadPdf.rejected, (state, action) => {
        state.upload.message = action.payload?.message || "Upload failed";
        state.upload.isLoading = false;
        state.upload.isError = true;
        state.upload.data = null;
      })
      .addCase(fetchDocuments.pending, (state) => {
        state.list.isLoading = true;
        state.list.message = "";
        state.list.isError = false;
        state.list.isSuccess = false;
        state.list.data = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.list.isLoading = false;
        state.list.isSuccess = true;
        state.list.data = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.list.message = action.payload?.message || "Failed to fetch documents";
        state.list.isLoading = false;
        state.list.isError = true;
        state.list.data = null;
      });
  },
});

export const { resetUpload, resetList } = documentsSlice.actions;
export default documentsSlice.reducer;
