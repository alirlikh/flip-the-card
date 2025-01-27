import { doubledList } from "./doubled-list";
import { shuffleTheList } from "./shuffle-list";
import { ImagesList } from "./types";

export const imagesList = (list: ImagesList[]): ImagesList[] => {
  const doubled = doubledList(list);
  const shuffle = shuffleTheList(doubled);
  return shuffle;
};
