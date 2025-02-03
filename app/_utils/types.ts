export type ImageType = {
  id: number;
  src: string;
  name?: string;
};

export type Score = {
  id: number;
  date: Date;
  score: number;
  result: "win" | "lose";
};
