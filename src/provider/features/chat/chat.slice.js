import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatService from "./chat.service";

const generalState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  data: null,
};

const initialState = {
  ask: generalState,
  feedback: generalState,
};

export const askQuestion = createAsyncThunk(
  "chat/ask",
  async ({ question, successCallBack }, thunkAPI) => {
    try {
      const response = await chatService.askQuestion(question);
      successCallBack?.(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || { message: error.message });
    }
  }
);

export const submitFeedback = createAsyncThunk(
  "chat/feedback",
  async ({ payload, successCallBack }, thunkAPI) => {
    try {
      const response = await chatService.submitFeedback(payload);
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

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetAsk: (state) => {
      state.ask = generalState;
    },
    resetFeedback: (state) => {
      state.feedback = generalState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(askQuestion.pending, (state) => {
        state.ask.isLoading = true;
        state.ask.message = "";
        state.ask.isError = false;
        state.ask.isSuccess = false;
        state.ask.data = null;
      })
      .addCase(askQuestion.fulfilled, (state, action) => {
        state.ask.isLoading = false;
        state.ask.isSuccess = true;
        state.ask.data = action.payload;
      })
      .addCase(askQuestion.rejected, (state, action) => {
        state.ask.message = action.payload?.message || "Failed to get answer";
        state.ask.isLoading = false;
        state.ask.isError = true;
        state.ask.data = null;
      })
      .addCase(submitFeedback.pending, (state) => {
        state.feedback.isLoading = true;
      })
      .addCase(submitFeedback.fulfilled, (state) => {
        state.feedback.isLoading = false;
        state.feedback.isSuccess = true;
      })
      .addCase(submitFeedback.rejected, (state) => {
        state.feedback.isLoading = false;
        state.feedback.isError = true;
      });
  },
});

export const { resetAsk, resetFeedback } = chatSlice.actions;
export default chatSlice.reducer;
