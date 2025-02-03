import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ScoreTooltip from "./ScoreTooltip";
import { Score } from "../_utils/types";
import { useEffect, useMemo, useState } from "react";
import { getScoreFromStorage } from "../_utils/RandWLocalStorage";
import { useAppSelector } from "../hooks/hook";
import { Calendar, Pin, PinIcon } from "lucide-react";

export function ScoreHistory() {
  const { gameOver, isWon } = useAppSelector((state) => state.gameState);

  const [savedScore, setSavedScore] = useState<Score[]>();

  useEffect(() => {
    const data = getScoreFromStorage();
    if (data) {
      setSavedScore(data);
    }
  }, [gameOver, isWon]);

  const scoresByDate = useMemo(() => {
    if (!savedScore?.length) return {};

    return savedScore?.reduce<Record<string, Score[]>>(
      (acc, curr) => {
        const dateKey = new Date(curr.date).toISOString().split("T")[0]; // YYYY-MM-DD
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(curr);
        return acc;
      },
      {} as Record<string, Score[]>
    );
  }, [savedScore]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <PinIcon />
          <div>Show the Score History</div>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Score History</SheetTitle>
          <SheetDescription>
            List of Score By Date That You Have Played
          </SheetDescription>
        </SheetHeader>

        {savedScore && savedScore ? (
          Object.entries(scoresByDate).map(([date, scores]) => (
            <div key={date} className="space-y-2">
              <div className="text-gray-400 text-sm mt-3 flex flex-row gap-x-2 items-center">
                <Calendar className="w-4" />

                <time>{new Date(date).toLocaleDateString()}</time>
              </div>
              <ul>
                {scores.map((score, index: number) => (
                  <ScoreTooltip
                    score={score.score}
                    result={score.result}
                    key={index}
                  >
                    <li>
                      <div
                        className={`flex flex-row items-center justify-between px-3 font-semibold text-lg ${score.result === "win" ? "text-green" : "text-red-800"}`}
                      >
                        <div className="text-center">
                          <span>Score:</span>
                        </div>
                        <div
                          className={`flex-1 border-b border-dashed ${score.result === "win" ? "border-b-green" : "border-b-red-800"}`}
                        ></div>
                        <div className="text-center">
                          <span>{score.score}</span>
                        </div>
                      </div>
                    </li>
                  </ScoreTooltip>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="text-red-800 mt-20 mx-auto px-5">
            <p>You don&apos;t have Score Data!</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
