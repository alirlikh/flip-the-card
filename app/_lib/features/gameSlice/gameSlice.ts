import { imagesList } from "@/app/_utils/image-list";
import { ImageType } from "@/app/_utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { setScoreInStorage } from "@/app/_utils/RandWLocalStorage";

const generateList = (categoryName: string) => {
  const data = Array.from({ length: 6 }, (_, index) => {
    return {
      id: index + 1,
      src: `/images/${categoryName}/${index + 1}.jpg`,
    };
  });
  const list = imagesList(data);
  return list;
};

const initialState = {
  cards: [] as ImageType[],
  category: "animal",
  flippedCards: [] as number[],
  matchedCards: [] as number[],
  timer: Number(process.env.NEXT_PUBLIC_TIMER) || 30,
  timeStarter: false,
  moves: 0,
  maxMoves: Number(process.env.NEXT_PUBLIC_MOVMENT) || 25,
  gameOver: false,
  isWon: false,
  loading: true,
  isChecking: false,
  score: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initializeCard: (state, action: PayloadAction<string>) => {
      const category = action.payload || state.category;
      state.cards = generateList(category);
      state.moves = 0;
      state.loading = false;
    },
    addFlippedCard: (state, action: PayloadAction<number>) => {
      const cardId = action.payload;
      if (
        !state.matchedCards.includes(cardId) &&
        !state.flippedCards.includes(cardId) &&
        !state.isChecking
      ) {
        state.flippedCards.push(cardId);
        state.moves += 1;
        if (state.moves >= state.maxMoves) {
          state.gameOver = true;
        }
      }
    },
    checkMatchedCard: (state) => {
      // if (state.flippedCards.length === 2) {
      const [firstCard, secondCard] = state.flippedCards.map((id) =>
        state.cards.find((card: ImageType) => card.id === id)
      );
      if (firstCard?.src === secondCard?.src) {
        state.matchedCards.push(...state.flippedCards);
      }
      state.flippedCards = [];
      state.isChecking = false;
      // }
    },
    timeCounter: (state) => {
      if (state.timer > 0) {
        state.timer -= 1;
      } else {
        state.gameOver = true;
      }
    },
    enableTimer: (state) => {
      state.timeStarter = true;
    },
    changeCategory: (state, action: PayloadAction<string>) => {
      const categoryName = action.payload;
      state.category = categoryName;
    },
    setGameStatus: (state) => {
      if (
        state.matchedCards.length > 0 &&
        state.matchedCards.length === state.cards.length
      ) {
        state.isWon = true;
        state.gameOver = true;
      } else if (state.timer <= 0 || state.maxMoves <= state.moves) {
        state.isWon = false;
        state.gameOver = true;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      const loadingState = action.payload;
      state.loading = loadingState;
    },
    setChecking: (state, action: PayloadAction<boolean>) => {
      state.isChecking = action.payload;
    },
    setScore: (state) => {
      const calculatedScore =
        state.matchedCards.length * 10 -
        (state.moves - state.matchedCards.length) * 2;
      state.score = calculatedScore > 0 ? calculatedScore : 0;

      if (state.isWon) {
        state.score = state.score + state.timer * 5;
      }
      if (state.gameOver) {
        setScoreInStorage({
          score: state.score,
          date: new Date(),
          result: state.isWon === true ? "win" : "lose",
        });
      }
    },
    resetGame: (state) => {
      const category = state.category;
      state.cards = generateList(category);
      state.flippedCards = [] as number[];
      state.matchedCards = [] as number[];
      state.timeStarter = false;
      state.gameOver = false;
      state.timer = Number(process.env.NEXT_PUBLIC_TIMER) || 30;
      state.moves = 0;
      state.loading = false;
      state.isChecking = false;
      state.score = 0;
      state.isWon = false;
      state.maxMoves = Number(process.env.NEXT_PUBLIC_MOVMENT) || 25;
    },
  },
});

export const {
  initializeCard,
  addFlippedCard,
  resetGame,
  timeCounter,
  changeCategory,
  enableTimer,
  setChecking,
  checkMatchedCard,
  setGameStatus,
  setLoading,
  setScore,
} = gameSlice.actions;

export const checkMatchedCardWithDelay = () => (dispatch: AppDispatch) => {
  dispatch(setChecking(true));

  setTimeout(() => {
    dispatch(checkMatchedCard());
  }, 750);
};

export default gameSlice.reducer;
