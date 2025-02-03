export const setScoreInStorage = (value: {
  score: number;
  date: Date;
  result: "win" | "lose";
}) => {
  const oldData = getScoreFromStorage();
  const newData = oldData ? oldData : [];
  newData.push(value);
  localStorage.setItem("flip-game-scores", JSON.stringify(newData));
};
export const getScoreFromStorage = () => {
  const scores = localStorage.getItem("flip-game-scores");
  if (!scores) return null;
  const parsedData = JSON.parse(scores);
  return parsedData;
};
