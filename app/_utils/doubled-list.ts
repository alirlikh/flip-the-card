import { ImageType } from "./types";

export const doubledList = (list: ImageType[]): ImageType[] => {
  const list2 = list.map((item) => {
    return { id: item.id + list.length, src: item.src };
  });

  const doubled = [...list, ...list2];
  return doubled;
};
