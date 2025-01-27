import { ImageType } from "@/app/_utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  cards: [] as ImageType[],
  flippedCards: [] as number[],
  matchedCards: [] as number[],
  moves: 0,
  maxMoves: 20,
  gameOver: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initializeCard(state, action: PayloadAction<ImageType[]>) {
      const cards = action.payload;
      state.cards = cards;
      state.moves = 0;
    },
    addFlippedCard(state, action: PayloadAction<number>) {
      const cardId = action.payload;

      if (
        !state.matchedCards.includes(cardId) &&
        !state.flippedCards.some((flippedId) => flippedId === cardId)
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
          state.cards.find((card: ImageType) => card.id === id)
        );
        if (firstCard?.src === secondCard?.src) {
          state.matchedCards.push(...state.flippedCards);
        }
        state.flippedCards = [];
      }
    },
    resetGame(state) {
      state.cards = [] as ImageType[];
      state.flippedCards = [] as number[];
      state.matchedCards = [] as number[];
      state.gameOver = false;
      state.moves = 0;
    },
  },
});

export const { initializeCard, addFlippedCard, checkMatchedCard, resetGame } =
  gameSlice.actions;

export default gameSlice.reducer;
