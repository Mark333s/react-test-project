import { configureStore } from "@reduxjs/toolkit";
import repositories from "./slices/repoSlice";

export const store = configureStore({
  reducer: { repositories },
});
