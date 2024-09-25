import { useGameOptions } from "@/components/GameOptionProvider";

const PlayBot = () => {
  const gameOptions = useGameOptions();

  return (
    <div>
      <p>{gameOptions.color}</p>
      <p>{gameOptions.difficulty}</p>
      <p>{gameOptions.showCoordinates ? "true" : "false"}</p>
    </div>
  );
};

export default PlayBot;
