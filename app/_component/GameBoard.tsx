"use client";

import GameCards from "./GameCards";
import {
  addFlippedCard,
  checkMatchedCardWithDelay,
  enableTimer,
} from "../_lib/features/gameSlice/gameSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import Spinner from "./Spinner";

function GameBoard() {
  const dispatch = useAppDispatch();
  const { cards, timeStarter, loading, flippedCards, isChecking } =
    useAppSelector((state) => state.gameState);

  // function handleClick(id: number) {
  //   if (!timeStarter) {
  //     dispatch(enableTimer());
  //   }
  //   dispatch(addFlippedCard(id));
  //   // setTimeout(() => {
  //   //   dispatch(checkMatchedCard());
  //   // }, 1000);
  // }

  function handleClick(id: number) {
    if (!timeStarter) {
      dispatch(enableTimer());
    }
    if (!isChecking) {
      dispatch(addFlippedCard(id));
      if (flippedCards.length === 1) {
        dispatch(checkMatchedCardWithDelay());
      }
    }
  }

  return (
    <div className="p-4 border-4 border-blackBlue text-center rounded-lg bg-white">
      <div className="w-[448px] min-h-96 flex flex-row gap-2 flex-wrap justify-around items-center ">
        {loading ? (
          <Spinner />
        ) : (
          cards?.map((item, index: number) => {
            return (
              <GameCards
                onClick={() => handleClick(item.id)}
                image={item}
                index={index}
                key={item.id}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
export default GameBoard;
