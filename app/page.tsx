import ImageCardPoster from "@/app/_component/ImageCardPoster";
import ImageCard from "./_component/ImageCard";

export default function Home() {
  return (
    <div>
      <ImageCardPoster cardNumber={1} />
      <ImageCard />
    </div>
  );
}
