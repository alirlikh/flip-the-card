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

export function ScoreHistory() {
  type Score = {
    id: number;
    date: Date;
    score: number;
    result: "win" | "lose";
  };
  const scoresAll = [
    {
      id: 1,
      date: new Date(),
      score: 150,
      result: "win",
    },
    {
      id: 2,
      date: new Date(),
      score: 50,
      result: "lose",
    },
    {
      id: 3,
      date: new Date(2023, 1, 2),
      score: 100,
      result: "lose",
    },
    {
      id: 4,
      date: new Date(2023, 4, 2),
      score: 250,
      result: "win",
    },
  ];

  const scoresByDate = scoresAll.reduce<Record<string, Score[]>>(
    (acc, curr) => {
      const dateKey = curr.date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      //@ts-expect-error ts error
      acc[dateKey].push(curr);
      return acc;
    },
    {} as Record<string, Score[]>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Show the Score History</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Score History</SheetTitle>
          <SheetDescription>
            List of Score By Date That You Have Played
          </SheetDescription>
        </SheetHeader>

        {Object.entries(scoresByDate).map(([date, scores]) => (
          <div key={date} className="space-y-2">
            <div className="text-gray-400 text-sm mt-3">
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
                      className={`flex flex-row items-center justify-between px-3 ${score.result === "win" ? "text-green" : "text-red-800"}`}
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
        ))}
      </SheetContent>
    </Sheet>
  );
}
