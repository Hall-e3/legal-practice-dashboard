import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import appReducer from "@/redux/features/appSlice";
import authReducer from "@/redux/features/authSlice";
import timeReducer from "@/redux/features/timeTrackingSlice";
import caseReducer from "@/redux/features/casesSlice";
import documentReducer from "@/redux/features/documentsSlice";
import notificationReducer from "@/redux/features/notificationSlice";
import { DEVELOPMENT } from "@/config";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["auth"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["userInfo"],
};

const rootReducer = combineReducers({
  app: appReducer,
  case: caseReducer,
  time: timeReducer,
  document: documentReducer,
  notification: notificationReducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: DEVELOPMENT,
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
