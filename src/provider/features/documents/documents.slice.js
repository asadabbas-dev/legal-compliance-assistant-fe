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
  delete: generalState,
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

export const deleteDocument = createAsyncThunk(
  "documents/delete",
  async ({ documentId, successCallBack }, thunkAPI) => {
    try {
      const response = await documentsService.deleteDocument(documentId);
      if (response.success) {
        successCallBack?.(response);
        return { documentId, ...response };
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
        
        // Store anonymous token if provided (for guest users)
        if (action.payload.anonymous_token && typeof window !== "undefined") {
          window.localStorage.setItem("rag_access_token", action.payload.anonymous_token);
        }
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
      })
      // Delete document
      .addCase(deleteDocument.pending, (state) => {
        state.delete.isLoading = true;
        state.delete.isError = false;
        state.delete.isSuccess = false;
        state.delete.error = null;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.delete.isLoading = false;
        state.delete.isSuccess = true;
        state.delete.data = action.payload;
        
        // Remove the deleted document from the list
        if (state.list.data?.documents) {
          state.list.data.documents = state.list.data.documents.filter(
            doc => doc.id !== action.payload.documentId
          );
        }
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.delete.isLoading = false;
        state.delete.isError = true;
        state.delete.error = action.payload;
      });
  },
});

export const { resetUpload, resetList } = documentsSlice.actions;
export default documentsSlice.reducer;