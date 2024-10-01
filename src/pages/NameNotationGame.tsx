import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Button } from "@/components/ui/button";
import { useGameOptions } from "@/components/GameOptionProvider";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useFen } from "@/components/FenProvider";
import { Chess } from "chess.js";
import {
  Arrow,
  BoardOrientation,
} from "react-chessboard/dist/chessboard/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "@/utils/isMobile";

const INCORRECT_ANSWER_COLOR = "#dc2626";
const CORRECT_ANSWER_COLOR = "#16a34a";
const defaultFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const MAX_TIME = 600;

const NameNotationGame = () => {
  const gameOptions = useGameOptions();
  const fen = useFen();
  const navigate = useNavigate();
  const [time, setTime] = useState(MAX_TIME);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [position, setPosition] = useState<string | undefined>(undefined);
  const [move, setMove] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [orientation, setOrientation] = useState<BoardOrientation>("white");
  const [showPopup, setShowPopup] = useState(false);
  const [isActiveGame, setIsActiveGame] = useState(true);
  const [customArrows, setCustomArrows] = useState<Arrow[] | undefined>(
    undefined
  );
  const [userAnswerColor, setUserAnswerColor] = useState("black");
  const isTimed = gameOptions.isTimed;

  const generateNextPosition = () => {
    const randomPosition = fen.getRandomPosition(gameOptions.color);
    const newGameState = new Chess(randomPosition);
    setOrientation(newGameState.turn() === "w" ? "white" : "black");
    setPosition(randomPosition);
    getRandomMove(randomPosition);
  };

  useEffect(() => {
    generateNextPosition();
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

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActiveGame]);

  // Returns true if it involves a check, checkmate, or castling
  const isSpecialMove = (move: string) => {
    return move.includes("+") || move.includes("#") || move.includes("-");
  };

  const getRandomMove = (fen: string) => {
    const chess = new Chess(fen);
    const moves = chess.moves();
    const verboseMoves = chess.moves({ verbose: true });

    const specialMoves = moves.filter((move) => isSpecialMove(move));

    let chosenMove;
    // Prioritize "special" moves for a more even distribution of moves
    if (specialMoves.length > 0 && Math.random() < 0.2) {
      chosenMove =
        specialMoves[Math.floor(Math.random() * specialMoves.length)];
    } else {
      chosenMove = moves[Math.floor(Math.random() * moves.length)];
    }

    // Generate arrows that will be shown after user makes move
    setMove(chosenMove);
    const verboseMove = verboseMoves.find((move) => move.san === chosenMove);

    if (!verboseMove) throw new Error(`Verbose move for ${move} doesn't exist`);

    setCustomArrows([[verboseMove.from, verboseMove.to]]);
  };

  const handleReset = () => {
    generateNextPosition();
    setScore(0);
    setTotal(0);
    setTime(MAX_TIME);
    setIsActiveGame(true);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  const handleAnswerSubmission = (e: React.FormEvent) => {
    e.preventDefault();

    // If user is correct
    if (userAnswer === move) {
      setScore(score + 1);
      setTotal(total + 1);
      setUserAnswerColor(CORRECT_ANSWER_COLOR);

      setTimeout(() => {
        generateNextPosition();
        setUserAnswer("");
        setUserAnswerColor("black");
      }, 500);
    }
    // If user is incorrect
    else {
      setTotal(total + 1);
      setUserAnswerColor(INCORRECT_ANSWER_COLOR);
      setTimeout(() => {
        setUserAnswerColor("black");
      }, 500);
    }
  };

  const handleSkipPosition = () => {
    setTotal(total + 1);
    setUserAnswerColor(INCORRECT_ANSWER_COLOR);
    setTimeout(() => {
      generateNextPosition();
      setUserAnswer("");
      setUserAnswerColor("black");
    }, 500);
  };

  return (
    <div className="flex flex-col items-center container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center">Name that Notation</h1>

      <div className="flex flex-wrap gap-4 justify-evenly align-center container mx-auto px-4 my-4 max-w-3xl">
        <div className="text-2xl">
          Score: {score} / {total}
        </div>
        <div className="text-2xl">Color: {orientation.toUpperCase()}</div>
        {isTimed && (
          <div className="text-2xl">Time Left: {Math.ceil(time)}</div>
        )}
      </div>

      <form
        onSubmit={handleAnswerSubmission}
        className="flex gap-1 align-center w-full sm:w-[80%] lg:w-[70%] mx-auto mb-4 max-w-3xl"
      >
        <Input
          className="flex-1 basis-10/12"
          style={{
            border: `2px solid ${userAnswerColor}`,
          }}
          placeholder="Move"
          value={userAnswer}
          onChange={handleAnswerChange}
        />
        <Button
          className="flex-none basis-1/12 bg-green-600 hover:bg-green-500"
          type="submit"
        >
          Submit
        </Button>
        <Button
          className="flex-none basis-1/12 bg-red-600 hover:bg-red-500"
          type="button"
          onClick={handleSkipPosition}
        >
          Skip
        </Button>
      </form>

      <div className="mb-6 w-full sm:w-[80%] lg:w-[70%]">
        <Chessboard
          id="NotationTrainer"
          position={position ?? defaultFen}
          showBoardNotation={gameOptions.showCoordinates}
          boardOrientation={orientation}
          customBoardStyle={{
            marginBottom: "20px",
          }}
          customArrows={customArrows ?? ([] as Arrow[])}
          arePiecesDraggable={false}
          customDndBackend={isMobile() ? TouchBackend : undefined}
        />
        {isTimed && <Progress value={(time * 100) / MAX_TIME} />}
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
            <AlertDialogDescription>
              Your accuracy:{" "}
              {total === 0 ? "0.00%" : ((score / total) * 100).toFixed(2)}%
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

export default NameNotationGame;
