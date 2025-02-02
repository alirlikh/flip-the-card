"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import {
  initializeCard,
  resetGame,
  setGameStatus,
  setLoading,
  timeCounter,
} from "../_lib/features/gameSlice/gameSlice";
import { useToast } from "@/hooks/use-toast";
import { useCallback, useEffect } from "react";
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
  const { toast } = useToast();

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

  const handleReset = () => {
    dispatch(resetGame());
    toast({
      title: "Game Restarted",
      description: "You can try Again!",
      variant: "destructive",
    });
  };

  return (
    <div className=" w-full">
      <div className="grid grid-cols-1  row-span-2">
        <div className="flex flex-row justify-between items-center px-5 py-8">
          <div>
            <CategorySelect />
          </div>
          <div>
            <Button onClick={handleReset} variant={"destructive"} size={"lg"}>
              Restart
            </Button>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center px-5 py-7">
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
    </div>
  );
}
export default GameHeader;
