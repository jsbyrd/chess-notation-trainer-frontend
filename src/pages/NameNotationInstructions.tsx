import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useGameOptions } from "@/components/GameOptionProvider";
import { useNavigate } from "react-router-dom";

type ChessColor = "white" | "black" | "random";
const DEFAULT_VALUE = "random";

const NameNotationInstructions = () => {
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ChessColor>(DEFAULT_VALUE);
  const gameOptions = useGameOptions();
  const navigate = useNavigate();

  const randomChessColor = (): "white" | "black" => {
    return Math.random() < 0.5 ? "white" : "black";
  };

  const handleColorChange = (value: ChessColor) => {
    setSelectedColor(value);
  };

  const handleStartGame = () => {
    gameOptions.setOptions({
      color: selectedColor,
      showCoordinates: showCoordinates,
      isTimed: true,
    });
    navigate("/name-notation/game");
  };

  const handleStartPractice = () => {
    gameOptions.setOptions({
      color: selectedColor,
      showCoordinates: showCoordinates,
      isTimed: false,
    });
    navigate("/name-notation/game");
  };

  return (
    <div className="flex flex-col items-center container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Name That Notation
      </h1>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="text-sm text-center">
          Instructions: You will be given a random board position and an arrow
          indicating a move to be made. Your goal is to write out the move in
          algebraic notation and do that for as many moves as possible in 60
          seconds! Do note that moves are randomly selected from all possible
          moves in a given position and may or may not be nonsensical.
        </p>
      </div>

      <div className="mb-6 w-[60%]">
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
        <Button onClick={handleStartGame}>Start</Button>
        <Button variant="outline" onClick={handleStartPractice}>
          Practice
        </Button>
      </div>

      <div className="flex justify-center items-center space-x-6 mb-4">
        <RadioGroup
          defaultValue={DEFAULT_VALUE}
          onValueChange={handleColorChange}
        >
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

export default NameNotationInstructions;
