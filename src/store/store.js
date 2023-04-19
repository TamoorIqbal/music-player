import { configureStore } from "@reduxjs/toolkit";
import audioSlice from "./audioSlice";

export const store = configureStore({
  reducer: {
    audio: audioSlice,
  },
});
