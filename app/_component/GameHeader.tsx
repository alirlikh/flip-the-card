"use client";

import { useAppDispatch, useAppSelector } from "../hooks/hook";
import {
  initializeCard,
  setGameStatus,
  setLoading,
  timeCounter,
} from "../_lib/features/gameSlice/gameSlice";
import { useCallback, useEffect, useMemo } from "react";
import CategorySelect from "./CategorySelect";
import { GameResultAlert } from "./GameResultAlert";

function GameHeader() {
  const dispatch = useAppDispatch();
  const {
    moves,
    maxMoves,
    timer,
    gameOver,
    category,
    timeStarter,
    isWon,
    matchedCards,
    flippedCards,
  } = useAppSelector((state) => state.gameState);
  const remainMove = maxMoves - moves > 0 ? maxMoves - moves : 0;

  const score = useMemo(() => {
    if (isWon) {
      return matchedCards.length * 10 + timer * 2;
    } else {
      const calculatedScore =
        matchedCards.length * 10 - (moves - matchedCards.length) * 2;
      return calculatedScore > 0 ? calculatedScore : 0;
    }
  }, [matchedCards, timer, moves, isWon]);

  const gameSatus = useCallback(() => {
    if (timer <= 0) {
      dispatch(setGameStatus());
    } else if (remainMove <= 0) {
      dispatch(setGameStatus());
    }
  }, [timer, remainMove, dispatch]);

  useEffect(() => {
    gameSatus();
  }, [flippedCards, matchedCards, timer]);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(initializeCard(category));
  }, [dispatch, category]);

  useEffect(() => {
    if (timer > 0 && !gameOver && timeStarter) {
      const intarval = setInterval(() => {
        dispatch(timeCounter());
      }, 1000);
      return () => clearInterval(intarval);
    }
  }, [dispatch, timer, gameOver, timeStarter]);

  return (
    // <div className="w-full mt-14 ">
    <div className="grid grid-cols-1  row-span-2 auto-rows-[60px]">
      <div className="flex flex-row justify-between items-center px-5">
        <div>
          <span className="font-bold">Your Score: {score}</span>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center px-5 py-8">
        <div>
          <CategorySelect />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center px-5 py-7 ">
        {(gameOver || isWon) && (
          <GameResultAlert
            open={gameOver || isWon}
            result={gameOver ? "lose" : "win"}
          />
        )}

        <div className="font-bold">
          <span>Time: {timer} s</span>
        </div>
        <div className="font-bold">
          <span>Remain Move: {remainMove}</span>
        </div>
      </div>
    </div>
    // </div>
  );
}
export default GameHeader;
