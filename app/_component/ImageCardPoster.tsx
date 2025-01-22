import { Card } from "@/components/ui/card";

function ImageCardPoster({ cardNumber }: { cardNumber: number }) {
  return (
    <Card className="w-[140px] h-[195px] bg-green text-white flex flex-col justify-between p-3 hover:border-2 hover:border-blue">
      <div className="self-start text-xl text-center">
        <span>1</span>
      </div>
      <div className="self-center text-5xl underline underline-offset-8">
        <span className="text-center">1</span>
      </div>
      <div className="self-end text-xl">
        <span>1</span>
      </div>
    </Card>
  );
}
export default ImageCardPoster;
