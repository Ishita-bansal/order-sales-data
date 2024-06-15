import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import LoginSlice from "./loginSlice";
import SalesSlice from "./salesSlice";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  loginReducer: LoginSlice.reducer,
  sales : SalesSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["register", "rehydrate"],
        // Ignore these paths in the state
        ignoredPaths: ["some.nested.path"],
      },
    }),
});

export const persistor = persistStore(store);
