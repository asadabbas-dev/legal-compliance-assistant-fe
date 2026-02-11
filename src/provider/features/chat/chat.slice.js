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
  create: generalState,
  list: generalState,
  history: generalState,
  message: generalState,
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

export const createChatSession = createAsyncThunk(
  "chat/create",
  async ({ title = "New chat", successCallBack }, thunkAPI) => {
    try {
      const response = await chatService.createChat(title);
      successCallBack?.(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || { message: error.message });
    }
  }
);

export const fetchChats = createAsyncThunk(
  "chat/list",
  async ({ successCallBack }, thunkAPI) => {
    try {
      const response = await chatService.listChats();
      successCallBack?.(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || { message: error.message });
    }
  }
);

export const fetchChatHistory = createAsyncThunk(
  "chat/history",
  async ({ chatId, successCallBack }, thunkAPI) => {
    try {
      const response = await chatService.getChatHistory(chatId);
      successCallBack?.(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || { message: error.message });
    }
  }
);

export const sendChatMessage = createAsyncThunk(
  "chat/message",
  async ({ chatId, content, successCallBack }, thunkAPI) => {
    try {
      const response = await chatService.sendChatMessage(chatId, content);
      successCallBack?.(response);
      return response;
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
    resetChatData: (state) => {
      state.create = generalState;
      state.list = generalState;
      state.history = generalState;
      state.message = generalState;
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
      .addCase(createChatSession.pending, (state) => {
        state.create.isLoading = true;
      })
      .addCase(createChatSession.fulfilled, (state, action) => {
        state.create.isLoading = false;
        state.create.isSuccess = true;
        state.create.data = action.payload;
      })
      .addCase(createChatSession.rejected, (state, action) => {
        state.create.isLoading = false;
        state.create.isError = true;
        state.create.message = action.payload?.message || "Failed to create chat";
      })
      .addCase(fetchChats.pending, (state) => {
        state.list.isLoading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.list.isLoading = false;
        state.list.isSuccess = true;
        state.list.data = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.list.isLoading = false;
        state.list.isError = true;
        state.list.message = action.payload?.message || "Failed to fetch chats";
      })
      .addCase(fetchChatHistory.pending, (state) => {
        state.history.isLoading = true;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.history.isLoading = false;
        state.history.isSuccess = true;
        state.history.data = action.payload;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.history.isLoading = false;
        state.history.isError = true;
        state.history.message = action.payload?.message || "Failed to fetch history";
      })
      .addCase(sendChatMessage.pending, (state) => {
        state.message.isLoading = true;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.message.isLoading = false;
        state.message.isSuccess = true;
        state.message.data = action.payload;
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.message.isLoading = false;
        state.message.isError = true;
        state.message.message = action.payload?.message || "Failed to send message";
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

export const { resetAsk, resetFeedback, resetChatData } = chatSlice.actions;
export default chatSlice.reducer;
