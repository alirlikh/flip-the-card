"use client";

import { useEffect, useMemo, useState } from "react";
import { getScoreFromStorage } from "../_utils/RandWLocalStorage";
import { Score } from "../_utils/types";
import { useAppSelector } from "./hook";

export function useSavedScore() {
  const { gameOver, isWon } = useAppSelector((state) => state.gameState);
  const [savedScore, setSavedScore] = useState<Score[]>(() =>
    typeof window !== "undefined" ? getScoreFromStorage() || [] : []
  );

  useEffect(() => {
    if (typeof window === "undefined") return () => {};

    const updateScores = () => {
      setSavedScore(getScoreFromStorage() || []);
    };

    if (gameOver || isWon) {
      updateScores();
      window.dispatchEvent(new Event("storage"));
    }

    window.addEventListener("storage", updateScores);
    return () => window.removeEventListener("storage", updateScores);
  }, [gameOver, isWon]);

  const scoresByDate = useMemo(() => {
    if (!savedScore?.length) return {};

    return savedScore.reduce<Record<string, Score[]>>(
      (acc, curr) => {
        const dateKey = new Date(curr.date).toISOString().split("T")[0]; // YYYY-MM-DD
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(curr);
        return acc;
      },
      {} as Record<string, Score[]>
    );
  }, [savedScore]);

  return { savedScore, scoresByDate };
}
