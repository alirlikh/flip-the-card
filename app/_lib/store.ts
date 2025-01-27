import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./features/gameSlice/gameSlice";

export const store = configureStore({
  reducer: {
    gameState: gameSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
