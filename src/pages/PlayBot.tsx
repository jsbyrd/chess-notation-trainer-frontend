import { useEffect, useMemo, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Button } from "@/components/ui/button";
import { useGameOptions } from "@/components/GameOptionProvider";
import { useNavigate } from "react-router-dom";
import {
  getStockfishEval,
  StockfishQueryReturn,
} from "@/services/stockfishService";
import { Chess } from "chess.js";
import {
  Arrow,
  BoardOrientation,
  PromotionPieceOption,
  Square,
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

const INCORRECT_ANSWER_COLOR = "#dc2626";
const CORRECT_ANSWER_COLOR = "#16a34a";
const defaultFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const PlayBot = () => {
  const gameOptions = useGameOptions();
  const navigate = useNavigate();
  const [position, setPosition] = useState<string>(defaultFen);
  const [userAnswer, setUserAnswer] = useState("");
  const [activeColor, setActiveColor] = useState<BoardOrientation>("white");
  const [showPopup, setShowPopup] = useState(false);
  // const [isActiveGame, setIsActiveGame] = useState(true);
  const [customArrows, setCustomArrows] = useState<Arrow[] | undefined>(
    undefined
  );
  const [userAnswerColor, setUserAnswerColor] = useState("black");
  const difficulty = useMemo(() => gameOptions.difficulty, [gameOptions]);
  const userColor = useMemo((): BoardOrientation => {
    if (gameOptions.color === "random") {
      return Math.random() < 0.5 ? "white" : "black";
    } else {
      return gameOptions.color;
    }
  }, [gameOptions]);

  const makeRandomMove = () => {
    // TODO: Get this to work
  };

  const handleBotMove = async () => {
    const oddsForRandomMove = difficulty / 100;
    if (Math.random() > oddsForRandomMove) {
      // Generate random move and make it
      return;
    }
    const chessEvalRes: Partial<StockfishQueryReturn> =
      await getStockfishEval(position);

    if (!chessEvalRes.success) {
      // Generate random move and make it
      console.log(chessEvalRes.error);
    } else {
      console.log(chessEvalRes);
    }
  };

  useEffect(() => {
    // if (activeColor !== userColor) handleBotMove();
    // handleBotMove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    console.log("hi again");
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  const handleAnswerSubmission = (e: React.FormEvent) => {
    e.preventDefault();

    const currentGameState = new Chess(position);
    const potentialMove = currentGameState
      .moves({ verbose: true })
      .find((move) => move.san === userAnswer);

    // If the submits something that isn't a valid move, notifiy them with a toast
    if (!potentialMove) {
      // TODO: Notify with toast
      console.log("bad move");
      return;
    }

    // Update board and make it the bot's turn
    currentGameState.move(userAnswer);
    setPosition(currentGameState.fen());
    setUserAnswer("");
    setActiveColor(userColor === "white" ? "black" : "white");

    // If user is correct
    // if (userAnswer === move) {
    //   setScore(score + 1);
    //   setTotal(total + 1);
    //   setUserAnswerColor(CORRECT_ANSWER_COLOR);

    //   setTimeout(() => {
    //     generateNextPosition();
    //     setUserAnswer("");
    //     setUserAnswerColor("black");
    //   }, 500);
    // }
    // // If user is incorrect
    // else {
    //   setTotal(total + 1);
    //   setUserAnswerColor(INCORRECT_ANSWER_COLOR);
    //   setTimeout(() => {
    //     setUserAnswerColor("black");
    //   }, 500);
    // }
  };

  const handleMoveDrop = (
    sourceSquare: string,
    targetSquare: string,
    promotionPiece: string
  ) => {
    try {
      // Simulate user's move
      const newGameState = new Chess(position);
      newGameState.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: promotionPiece ? promotionPiece[1].toLowerCase() : "q",
      });
      setPosition(newGameState.fen());
      return true;
    } catch {
      return false;
    }
  };

  const handlePromotion = (
    piece: PromotionPieceOption | undefined,
    promoteFromSquare: Square | undefined,
    promoteToSquare: Square | undefined
  ) => {
    if (!piece || !promoteFromSquare || !promoteToSquare) {
      // TODO: Notify user of error via toast
      return false;
    }
    return handleMoveDrop(
      promoteFromSquare as string,
      promoteToSquare as string,
      piece as string
    );
  };

  return (
    <div className="flex flex-col items-center container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-6">Playing VS Bot</h1>

      <form
        onSubmit={handleAnswerSubmission}
        className="flex gap-2 align-center w-[85%] mx-auto px-4 pb-4 max-w-3xl"
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
          className="flex-none basis-2/12 bg-green-600 hover:bg-green-500"
          type="submit"
        >
          Make Move
        </Button>
      </form>

      <div className="mb-6 w-[80%]">
        <Chessboard
          id="NotationTrainer"
          position={position ?? defaultFen}
          showBoardNotation={gameOptions.showCoordinates}
          boardOrientation={userColor}
          customBoardStyle={{
            marginBottom: "20px",
          }}
          customArrows={customArrows ?? ([] as Arrow[])}
          arePiecesDraggable={true}
          onPieceDrop={handleMoveDrop}
          onPromotionPieceSelect={handlePromotion}
        />
      </div>

      <div className="flex justify-center space-x-4">
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
              You lost! TODO: Update later
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

export default PlayBot;
