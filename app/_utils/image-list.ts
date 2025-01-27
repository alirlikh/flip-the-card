import { doubledList } from "./doubled-list";
import { shuffleTheList } from "./shuffle-list";
import { ImageType } from "./types";

export const imagesList = (list: ImageType[]): ImageType[] => {
  const doubled = doubledList(list);
  const shuffle = shuffleTheList(doubled);
  return shuffle;
};
