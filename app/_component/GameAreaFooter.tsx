"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { resetGame } from "../_lib/features/gameSlice/gameSlice";

function GameAreaFooter() {
  const dispatch = useAppDispatch();
  const { timeStarter } = useAppSelector((state) => state.gameState);

  const { toast } = useToast();
  const handleReset = () => {
    dispatch(resetGame());
    toast({
      title: "Game Restarted",
      description: "You can try Again!",
      variant: "destructive",
    });
  };
  return (
    <>
      <div className="p-5 mt-2  place-items-center text-center">
        {/* {!!timeStarter && ( */}
        <Button
          className={`opacity-0 transition-all invisible delay-100 ${!!timeStarter ? "opacity-100 visible" : "visible"}`}
          onClick={handleReset}
          variant={"destructive"}
          size={"lg"}
        >
          Restart
        </Button>
        {/* )} */}
      </div>
    </>
  );
}
export default GameAreaFooter;
