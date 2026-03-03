// #region agent log
console.log('🔍 DEBUG_STORE_1: Store imports starting', {location:'store.js:1', timestamp:Date.now()});
if (typeof window !== 'undefined') { window.DEBUG_LOGS = window.DEBUG_LOGS || []; window.DEBUG_LOGS.push('STORE_1: Store imports starting'); }
// #endregion

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// #region agent log
console.log('🔍 DEBUG_STORE_2: Before auth import', {location:'store.js:8', timestamp:Date.now()});
if (typeof window !== 'undefined') { window.DEBUG_LOGS = window.DEBUG_LOGS || []; window.DEBUG_LOGS.push('STORE_2: Before auth import'); }
// #endregion

import authReducer from "./features/auth/auth.slice";

// #region agent log
console.log('🔍 DEBUG_STORE_3: Before chat import', {location:'store.js:12', timestamp:Date.now()});
if (typeof window !== 'undefined') { window.DEBUG_LOGS = window.DEBUG_LOGS || []; window.DEBUG_LOGS.push('STORE_3: Before chat import'); }
// #endregion

import chatReducer from "./features/chat/chat.slice";

// #region agent log
console.log('🔍 DEBUG_STORE_4: Before documents import', {location:'store.js:16', timestamp:Date.now()});
if (typeof window !== 'undefined') { window.DEBUG_LOGS = window.DEBUG_LOGS || []; window.DEBUG_LOGS.push('STORE_4: Before documents import'); }
// #endregion

import documentsReducer from "./features/documents/documents.slice";
// import anonymousReducer from "./features/anonymous/anonymous.slice"; // Not needed

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// #region agent log
console.log('🔍 DEBUG_STORE_5: Creating rootReducer', {location:'store.js:25', authExists:!!authReducer, chatExists:!!chatReducer, docsExists:!!documentsReducer, timestamp:Date.now()});
if (typeof window !== 'undefined') { window.DEBUG_LOGS = window.DEBUG_LOGS || []; window.DEBUG_LOGS.push('STORE_5: Creating rootReducer'); }
// #endregion

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  documents: documentsReducer,
  // anonymous: anonymousReducer, // Not needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// #region agent log
console.log('🔍 DEBUG_STORE_6: Creating store', {location:'store.js:35', timestamp:Date.now()});
if (typeof window !== 'undefined') { window.DEBUG_LOGS = window.DEBUG_LOGS || []; window.DEBUG_LOGS.push('STORE_6: Creating store'); }
// #endregion

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
