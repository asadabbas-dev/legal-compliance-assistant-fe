import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/auth/auth.slice";
import documentsReducer from "./features/documents/documents.slice";
// import chatReducer from "./features/chat/chat.slice"; // Temporarily disabled
// import anonymousReducer from "./features/anonymous/anonymous.slice"; // Temporarily disabled

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  documents: documentsReducer,
  // chat: chatReducer, // Temporarily disabled
  // anonymous: anonymousReducer, // Temporarily disabled
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
