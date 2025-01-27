function ImageCardPoster({ cardNumber }: { cardNumber: number }) {
  return (
    <div className="relative  text-center h-full">
      <div className="absolute top-2 left-3 text-left">
        <span>{cardNumber}</span>
      </div>
      <div className="absolute left-0 right-0 bottom-0 top-0  place-self-center   ">
        <span className=" font-medium text-4xl">{cardNumber}</span>
      </div>
      <div className="absolute bottom-2 right-3 text-right">
        <span>{cardNumber}</span>
      </div>
    </div>
  );
}
export default ImageCardPoster;
