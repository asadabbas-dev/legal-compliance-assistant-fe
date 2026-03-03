console.log("🔍 DEBUG: store.js - Starting import");

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/auth/auth.slice";

console.log("🔍 DEBUG: About to import documentsReducer");
import documentsReducer from "./features/documents/documents.slice";
console.log("🔍 DEBUG: documentsReducer imported successfully");
// import chatReducer from "./features/chat/chat.slice"; // Temporarily disabled
// import anonymousReducer from "./features/anonymous/anonymous.slice"; // Temporarily disabled

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

console.log("🔍 DEBUG: Creating rootReducer");
const rootReducer = combineReducers({
  auth: authReducer,
  documents: documentsReducer,
  // chat: chatReducer, // Temporarily disabled
  // anonymous: anonymousReducer, // Temporarily disabled
});
console.log("🔍 DEBUG: rootReducer created");

const persistedReducer = persistReducer(persistConfig, rootReducer);

console.log("🔍 DEBUG: Creating store");
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});
console.log("🔍 DEBUG: store created");

export const persistor = persistStore(store);
