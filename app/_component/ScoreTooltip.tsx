import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ScoreTooltipProps = {
  score: number;
  result: "win" | "lose";
  children: React.ReactNode;
};

const ScoreTooltip: React.FC<ScoreTooltipProps> = ({
  score,
  result,
  children,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>
            {result === "win"
              ? `Great job! You scored ${score} points.`
              : `Better luck next time! You scored ${score} points.`}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ScoreTooltip;
