import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type ChessColor = "white" | "black" | "random";

const MakeThatMove = () => {
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ChessColor>("white");

  const randomChessColor = (): "white" | "black" => {
    return Math.random() < 0.5 ? "white" : "black";
  };

  const handleColorChange = (value: ChessColor) => {
    setSelectedColor(value);
  };

  return (
    <div className="flex flex-col items-center container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4 text-center">Make That Move</h1>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="text-sm text-center">
          Instructions: You will be given a random board position and a move to
          make in algebraic notation. Your goal is to make as many correct moves
          as possible in 60 seconds!
        </p>
      </div>

      <div className="mb-6 w-[480px]">
        <Chessboard
          id="NotationTrainer"
          showBoardNotation={showCoordinates}
          boardOrientation={
            selectedColor !== "random" ? selectedColor : randomChessColor()
          }
          arePiecesDraggable={false}
        />
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <Button>Start</Button>
        <Button variant="outline">Practice</Button>
      </div>

      <div className="flex justify-center items-center space-x-6 mb-4">
        <RadioGroup defaultValue="white" onValueChange={handleColorChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="white" id="white" />
            <Label htmlFor="white">White</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="black" id="black" />
            <Label htmlFor="black">Black</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="random" id="random" />
            <Label htmlFor="random">Random</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-center items-center">
        <Checkbox
          id="show-coordinates"
          checked={showCoordinates}
          onCheckedChange={(checked) => setShowCoordinates(checked as boolean)}
        />
        <Label htmlFor="show-coordinates" className="ml-2">
          Show Coordinates
        </Label>
      </div>
    </div>
  );
};

export default MakeThatMove;
