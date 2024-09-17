import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Button } from "@/components/ui/button";
import { useGameOptions } from "@/components/GameOptionProvider";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useFen } from "@/components/FenProvider";
import { Chess } from "chess.js";
import { BoardOrientation } from "react-chessboard/dist/chessboard/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const defaultFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const MAX_TIME = 60;

const MakeMoveInstructions = () => {
  const gameOptions = useGameOptions();
  const fen = useFen();
  const navigate = useNavigate();
  const [time, setTime] = useState(MAX_TIME);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState<string | undefined>(undefined);
  const [move, setMove] = useState("");
  const [orientation, setOrientation] = useState<BoardOrientation>("white");
  const [showPopup, setShowPopup] = useState(false);
  const [isActiveGame, setIsActiveGame] = useState(true);
  const isTimed = gameOptions.isTimed;

  useEffect(() => {
    const randomPosition = fen.getRandomPosition();
    updateGameStates(randomPosition);
    getRandomMove(randomPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isActiveGame || !isTimed) return;
    // Set an interval to decrease the count every second (1000 ms)
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0.1) {
          clearInterval(interval); // Stop the countdown when it reaches 0
          setShowPopup(true);
          setIsActiveGame(false);
          return 0;
        }
        return prevTime - 0.1;
      });
    }, 100);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActiveGame]);

  // Returns true if it involves a check, checkmate, or castling
  const isSpecialMove = (move: string) => {
    return move.includes("+") || move.includes("#") || move.includes("-");
  };

  // Update all states related to our game object
  const updateGameStates = (fen: string) => {
    const newGameState = new Chess(fen);
    setOrientation(newGameState.turn() === "w" ? "white" : "black");
    setGame(newGameState);
    setPosition(fen);
  };

  const getRandomMove = (fen: string) => {
    const chess = new Chess(fen);
    const moves = chess.moves();
    const specialMoves = moves.filter((move) => isSpecialMove(move));

    // Prioritize "special" moves for a more even distribution of moves
    if (specialMoves.length > 0) {
      setMove(specialMoves[Math.floor(Math.random() * specialMoves.length)]);
    } else {
      setMove(moves[Math.floor(Math.random() * moves.length)]);
    }
  };

  const generateNextPosition = () => {
    const randomPosition = fen.getRandomPosition();
    updateGameStates(randomPosition);
    getRandomMove(randomPosition);
  };

  const handleMoveDrop = (sourceSquare: string, targetSquare: string) => {
    try {
      // Simulate user's move
      const gameCopy = new Chess(game.fen());
      gameCopy.move({ from: sourceSquare, to: targetSquare });
      updateGameStates(gameCopy.fen());

      // Get fen from making the correct move
      const gameCopyAnswer = new Chess(game.fen());
      gameCopyAnswer.move(move);
      const correctAnswer = gameCopyAnswer.fen();

      // Compare correct answer to the fen generated by user's move
      if (gameCopy.fen() === correctAnswer) {
        setScore(score + 1);
      }

      setTotal(total + 1);
      generateNextPosition();

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleReset = () => {
    const randomPosition = fen.getRandomPosition();
    updateGameStates(randomPosition);
    getRandomMove(randomPosition);
    setScore(0);
    setTotal(0);
    setTime(MAX_TIME);
    setIsActiveGame(true);
  };

  return (
    <div className="flex flex-col items-center container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center">Make That Move</h1>

      <div className="flex justify-evenly align-center container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-2xl">
          Score: {score} / {total}
        </div>
        <div className="text-2xl">Color: {orientation.toUpperCase()}</div>
        <div className="text-2xl">Move: {move}</div>
        <div className="text-2xl">Time Left: {Math.ceil(time)}</div>
      </div>

      <div className="mb-6 w-[80%]">
        <Chessboard
          id="NotationTrainer"
          position={position ?? defaultFen}
          showBoardNotation={gameOptions.showCoordinates}
          boardOrientation={orientation}
          customBoardStyle={{ marginBottom: "20px" }}
          onPieceDrop={handleMoveDrop}
        />
        <Progress value={(time * 100) / MAX_TIME} />
      </div>

      <div className="flex justify-center space-x-4 my-6">
        <Button
          onClick={() => {
            navigate("/make-move/instructions");
          }}
        >
          Return to Instructions
        </Button>
      </div>
      <AlertDialog open={showPopup} onOpenChange={setShowPopup}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time's up!</AlertDialogTitle>
            <AlertDialogDescription>
              Your final score: {score} / {total}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleReset}>
              Restart Game
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() => navigate("/make-move/instructions")}
            >
              Back to Instructions
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MakeMoveInstructions;
