import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScoreTooltip from "./ScoreTooltip";
import { Calendar, PinIcon } from "lucide-react";
import { useSavedScore } from "../hooks/useSavedScore";

export function ScoreHistory() {
  const { savedScore, scoresByDate } = useSavedScore();

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
        <ScrollArea className="h-full pb-16">
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
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
