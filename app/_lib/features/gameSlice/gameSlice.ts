import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  cards: [] as any[],
  flippedCards: [] as any[],
  matchedCards: [] as any[],
  moves: 0,
  maxMoves: 20,
  gameOver: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initializeCard(state, action: PayloadAction<any>) {
      const cards = action.payload;
      state.cards = cards;
      state.moves = 0;
    },
    addFlippedCard(state, action: PayloadAction<any>) {
      const cardId = action.payload;

      if (
        !state.matchedCards.includes(cardId) &&
        !state.flippedCards.some((flipped) => flipped.id === cardId)
      ) {
        state.flippedCards.push(cardId);
        state.moves += 1;
        if (state.moves >= state.maxMoves) {
          state.gameOver = true;
        }
      }
    },
    checkMatchedCard: (state) => {
      if (state.flippedCards.length === 2) {
        const [firstCard, secondCard] = state.flippedCards.map((id) =>
          state.cards.find((card) => card.id === id)
        );
        if (firstCard.src === secondCard.src) {
          state.matchedCards.push(...state.flippedCards);
        }
        state.flippedCards = [];
      }
    },
    resetGame(state) {
      state.cards = [];
      state.flippedCards = [];
      state.matchedCards = [];
      state.gameOver = false;
      state.moves = 0;
    },
  },
});

export const { initializeCard, addFlippedCard, checkMatchedCard, resetGame } =
  gameSlice.actions;

export default gameSlice.reducer;
