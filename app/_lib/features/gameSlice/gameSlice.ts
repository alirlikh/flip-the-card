import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  time: 0,
  flippedCards: [] as any[],
  matchedCards: [] as any[],
  moves: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    addFlippedCard(state, action: PayloadAction<any>) {
      if (state.flippedCards.length < 2) {
        const cardId = action.payload;
        state.flippedCards.push(cardId);
      }
    },
    addMatchedCard(state, action: PayloadAction<any>) {
      const matchedId = action.payload;
      state.matchedCards.push(matchedId);
    },
    addMove(state) {
      state.moves += 1;
    },
  },
});

export const { addFlippedCard, addMatchedCard, addMove } = gameSlice.actions;

export default gameSlice.reducer;
