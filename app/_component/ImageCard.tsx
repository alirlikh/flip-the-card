import Image from "next/image";
import { ImageType } from "../_utils/types";

function ImageCard({ image }: { image: ImageType }) {
  return (
    <div className="relative text-center h-full ">
      <Image
        className="object-cover rounded-lg"
        fill
        src={image.src}
        alt={`${image.id} puzzle iamge`}
        sizes="auto"
        priority
      />
    </div>
  );
}
export default ImageCard;
