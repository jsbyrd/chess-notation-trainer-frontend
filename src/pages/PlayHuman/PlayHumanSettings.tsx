import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type PlayHumanSettingsProps = {
  handleJoinGame: () => void;
  handleCreateGame: () => void;
  colorPreference: string;
  handleColorChange: (color: string) => void;
  gameId: string | undefined;
  handleGameIdChange: (gameId: string) => void;
};

const PlayHumanSettings = (props: PlayHumanSettingsProps) => {
  const {
    handleJoinGame,
    handleCreateGame,
    colorPreference,
    handleColorChange,
    gameId,
    handleGameIdChange,
  } = props;

  return (
    <div className="flex flex-col items-center container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Create or Join a Game
      </h1>

      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create Game</TabsTrigger>
            <TabsTrigger value="join">Join Game</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Choose your color:</h3>
                <RadioGroup
                  defaultValue={colorPreference}
                  onValueChange={(value) => {
                    handleColorChange(value);
                  }}
                  className="flex flex-col space-y-1"
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
              <Button onClick={handleCreateGame} className="w-full">
                Create Game
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="join">
            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="gameId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Game ID
                </Label>
                <Input
                  type="text"
                  id="gameId"
                  placeholder="####-####-####"
                  value={gameId}
                  onChange={(e) => handleGameIdChange(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button onClick={handleJoinGame} className="w-full">
                Join Game
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlayHumanSettings;
