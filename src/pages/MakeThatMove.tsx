import { FenContext } from "@/components/FenProvider";
import { useEffect, useContext } from "react";
import { Chess } from "chess.js";

export const MakeThatMove = () => {
  const fenStrings = useContext(FenContext);
  // const [game, setGame] = useState(new Chess());
  const game = new Chess();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * fenStrings.length);
    const randomPosition = fenStrings[randomIndex];
    game.load(randomPosition);
    console.log(game.moves());
  });

  return <div>Hello</div>;
};
