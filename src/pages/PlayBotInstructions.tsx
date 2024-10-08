import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useGameOptions } from "@/components/GameOptionProvider";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InfoIcon } from "lucide-react";

type ChessColor = "white" | "black" | "random";
const DEFAULT_VALUE = "random";
const DEFAULT_DIFFICULTY = 50;

const PlayBotInstructions = () => {
  const [showCoordinates, setShowCoordinates] = useState(true);
  const [selectedColor, setSelectedColor] = useState<ChessColor>(DEFAULT_VALUE);
  const [difficulty, setDifficulty] = useState<number>(DEFAULT_DIFFICULTY);
  const gameOptions = useGameOptions();
  const navigate = useNavigate();

  const handleColorChange = (value: ChessColor) => {
    setSelectedColor(value);
  };

  const handleDifficultyChange = (value: number[]) => {
    setDifficulty(value[0]);
  };

  const handleStartGame = () => {
    gameOptions.setOptions({
      color: selectedColor,
      showCoordinates: showCoordinates,
      difficulty: difficulty,
    });
    navigate("/play-bot/game");
  };

  return (
    <div className="flex flex-col items-center container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Play Against AI Bot
      </h1>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Game Settings</CardTitle>
          <CardDescription>
            Choose how you want to play against the AI...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2 py-2">
            <h3 className="text-sm font-medium">Choose your color</h3>
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
          <div className="flex items-center space-x-2 py-2">
            <Checkbox
              id="show-coordinates"
              checked={showCoordinates}
              onCheckedChange={(checked) =>
                setShowCoordinates(checked as boolean)
              }
            />
            <Label htmlFor="show-coordinates" className="ml-2">
              Show Coordinates
            </Label>
          </div>
          <div className="space-y-2 py-2">
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger>
                  <InfoIcon className="h-4 w-4" />
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <p className="text-sm">
                    Difficulty represents the percentage chance that a move is
                    generated by a chess AI. The difference is made up of
                    randomly generated moves For example, if you select a
                    difficulty of 80, then 80% of the moves are generated by a
                    chess AI and the other 20% are generated at random.
                  </p>
                </PopoverContent>
              </Popover>
              <h3 className="text-sm font-medium">Difficulty: {difficulty}</h3>
            </div>

            <Slider
              defaultValue={[DEFAULT_DIFFICULTY]}
              value={[difficulty]}
              onValueChange={handleDifficultyChange}
              max={100}
              step={1}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full mt-3" onClick={handleStartGame}>
            Start Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PlayBotInstructions;
