"use client";

import { useAppDispatch, useAppSelector } from "../hooks/hook";
import {
  initializeCard,
  setGameStatus,
  setLoading,
  setScore,
  timeCounter,
} from "../_lib/features/gameSlice/gameSlice";
import { useCallback, useEffect } from "react";
import CategorySelect from "./CategorySelect";
import { GameResultAlert } from "./GameResultAlert";
import { ScoreHistory } from "./ScoreHistory";

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
    score,
  } = useAppSelector((state) => state.gameState);
  const remainMove = maxMoves - moves > 0 ? maxMoves - moves : 0;

  const gameStatus = useCallback(() => {
    dispatch(setGameStatus());
  }, [dispatch]);

  useEffect(() => {
    gameStatus();
  }, [timer, remainMove, isWon, gameStatus, gameOver]);

  useEffect(() => {
    dispatch(setScore());
  }, [gameOver, isWon, dispatch]);

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
    <div className="grid grid-cols-1  row-span-2 auto-rows-[60px]">
      <div className="flex flex-row justify-between items-center px-5">
        <div>
          <span className="font-bold">Your Score: {score}</span>
        </div>
        <div>
          <ScoreHistory />
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
            result={!isWon ? "lose" : "win"}
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
  );
}
export default GameHeader;
