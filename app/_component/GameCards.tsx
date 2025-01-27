import { MouseEventHandler } from "react";
import { useAppSelector } from "../hooks/hook";
import ImageCard from "./ImageCard";
import ImageCardPoster from "./ImageCardPoster";
import { ImageType } from "../_utils/types";

function GameCards({
  onClick,
  index,
  image,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  index: number;
  image: ImageType;
}) {
  const { flippedCards, matchedCards } = useAppSelector(
    (state) => state.gameState
  );
  const isMatched = matchedCards.includes(image.id);
  const isFlipped = flippedCards.includes(image.id);

  return (
    <button
      onClick={onClick}
      className={`${isMatched ? "blur-[2px]" : ""} card  ${isFlipped ? "flipped" : ""}`}
      disabled={isMatched}
    >
      <div
        className={`w-[100px] h-[135px] bg-green text-white rounded-lg border-2 ${isMatched ? "" : "hover:border-blue hover:border-2"}`}
      >
        {isFlipped || isMatched ? (
          <ImageCard image={image} />
        ) : (
          <ImageCardPoster cardNumber={index + 1} />
        )}
      </div>
    </button>
  );
}
export default GameCards;
