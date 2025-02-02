import GameAreaFooter from "./GameAreaFooter";
import GameBoard from "./GameBoard";
import GameHeader from "./GameHeader";

function Game() {
  return (
    <div className="border-t-4 rounded-t-sm border-t-blackBlue bg-gray-50 mt-14 rounded-sm">
      <div className="px-5">
        <GameHeader />
      </div>
      <div className="px-10">
        <GameBoard />
      </div>
      <GameAreaFooter />
    </div>
  );
}
export default Game;
