import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./fileSlice";
import queryReducer from "./querySlice";

export const store = configureStore({
  reducer: {
    file: fileReducer,
    query: queryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;