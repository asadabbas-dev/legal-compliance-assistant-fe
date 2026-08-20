import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, removeUser } from "@/common/utils/users.util";
import authService from "./auth.service";

const generalState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  data: null,
};

const initialState = {
  isCreatorMode: null,
  sidebarToggleItem: false,
  logoutLoader: false,
  user: getUser() || null,
  login: generalState,
  signUp: generalState,
  logout: generalState,
};

function errorMessage(error, fallback) {
  return (
    error?.detail ||
    error?.message ||
    error?.payload?.message ||
    fallback
  );
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ payload, successCallBack }, thunkAPI) => {
    try {
      const response = await authService.login(payload);
      successCallBack?.(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || { message: error.message },
      );
    }
  },
);

export const signUp = createAsyncThunk(
  "auth/register",
  async ({ payload, successCallBack }, thunkAPI) => {
    try {
      const response = await authService.signUp(payload);
      successCallBack?.(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || { message: error.message },
      );
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await authService.logout();
    removeUser();
    return response;
  } catch (error) {
    removeUser();
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsCreatorModeMode: (state, action) => {
      state.isCreatorMode = action.payload;
    },
    setSidebarToggleItem: (state, action) => {
      state.sidebarToggleItem = action.payload;
    },
    setLogoutLoader: (state, action) => {
      state.logoutLoader = action.payload;
    },
    reset: (state) => {
      state.login = generalState;
      state.logout = generalState;
      state.signUp = generalState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.login.isLoading = true;
        state.login.message = "";
        state.login.isError = false;
        state.login.isSuccess = false;
        state.login.data = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login.isLoading = false;
        state.login.isSuccess = true;
        state.login.data = action.payload;
        state.user = action.payload?.user || null;
      })
      .addCase(login.rejected, (state, action) => {
        state.login.message = errorMessage(action.payload, "Login failed");
        state.login.isLoading = false;
        state.login.isError = true;
        state.login.data = null;
      })
      .addCase(signUp.pending, (state) => {
        state.signUp.isLoading = true;
        state.signUp.message = "";
        state.signUp.isError = false;
        state.signUp.isSuccess = false;
        state.signUp.data = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.signUp.isLoading = false;
        state.signUp.isSuccess = true;
        state.signUp.data = action.payload;
        state.user = action.payload?.user || null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUp.message = errorMessage(action.payload, "Sign up failed");
        state.signUp.isLoading = false;
        state.signUp.isError = true;
        state.signUp.data = null;
      })
      .addCase(logout.pending, (state) => {
        state.logout.isLoading = true;
        state.logout.message = "";
        state.logout.isError = false;
        state.logout.isSuccess = false;
        state.logout.data = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.logout.isLoading = false;
        state.logout.isSuccess = true;
        state.logout.data = action.payload;
        state.user = null;
        state.logoutLoader = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logout.message = errorMessage(action.payload, "Logout failed");
        state.logout.isLoading = false;
        state.logout.isError = true;
        state.logout.data = null;
        state.user = null;
        state.logoutLoader = false;
      });
  },
});

export const {
  reset,
  setIsCreatorModeMode,
  setSidebarToggleItem,
  setLogoutLoader,
} = authSlice.actions;

export default authSlice.reducer;
