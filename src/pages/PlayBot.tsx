import { useEffect, useMemo, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Button } from "@/components/ui/button";
import { useGameOptions } from "@/components/GameOptionProvider";
import { useNavigate } from "react-router-dom";
import {
  getStockfishEval,
  StockfishQueryReturn,
} from "@/services/stockfishService";
import { Chess, DEFAULT_POSITION } from "chess.js";
import {
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
import {
  EndGameState,
  getEndGameMessage,
  getEndGameState,
} from "@/utils/endGameUtils";
import { useToast } from "@/hooks/use-toast";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "@/utils/isMobile";

const defaultFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const PlayBot = () => {
  const { toast } = useToast();
  const gameOptions = useGameOptions();
  const navigate = useNavigate();
  const [position, setPosition] = useState<string>(defaultFen);
  const [userAnswer, setUserAnswer] = useState("");
  const [endGameMessage, setEndGameMessage] = useState("");
  const [activeColor, setActiveColor] = useState<BoardOrientation>("white");
  const [showPopup, setShowPopup] = useState(false);
  const [isActiveGame, setIsActiveGame] = useState(true);
  const [activeChess, setActiveChess] = useState(new Chess(defaultFen));
  const difficulty = useMemo(() => gameOptions.difficulty, [gameOptions]);
  const userColor = useMemo((): BoardOrientation => {
    if (gameOptions.color === "random") {
      return Math.random() < 0.5 ? "white" : "black";
    } else {
      return gameOptions.color;
    }
  }, [gameOptions]);

  const makeRandomMove = () => {
    const chess = new Chess(position);
    const moves = chess.moves();
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    chess.move(randomMove);
    setActiveChess(chess);
    setPosition(chess.fen());
    setActiveColor(userColor);
  };

  const makeStockfishMove = async () => {
    const chessEvalRes: Partial<StockfishQueryReturn> =
      await getStockfishEval(position);

    if (!chessEvalRes.success) {
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem making a request to stockfish. Now defaulting to a random move.",
      });
      makeRandomMove();
      return;
    }

    // Extract best move from our response object and make that move
    const bestMove = chessEvalRes.bestmove?.split(" ")[1];

    if (!bestMove) {
      makeRandomMove();
      return;
    }

    const chess = new Chess(position);
    chess.move(bestMove);
    setActiveChess(chess);
    setPosition(chess.fen());
    setActiveColor(userColor);
  };

  // Either generate and make a random move, or get a move from stockfish and make that move
  const handleBotMove = async () => {
    const oddsForRandomMove = difficulty / 100;
    if (Math.random() > oddsForRandomMove) {
      makeRandomMove();
    } else {
      await makeStockfishMove();
    }
  };

  // Check for win/loss/draw after every move and handle bot moves
  useEffect(() => {
    const endGameState = getEndGameState(activeChess);
    if (endGameState !== EndGameState.ACTIVE_GAME) {
      setIsActiveGame(false);
      setEndGameMessage(
        getEndGameMessage(endGameState, userColor !== activeColor)
      );
      setShowPopup(true);
      return;
    }

    if (activeColor !== userColor) handleBotMove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeColor]);

  const handleReset = () => {
    setIsActiveGame(true);
    setPosition(DEFAULT_POSITION);
    setActiveChess(new Chess(DEFAULT_POSITION));
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  const handleAnswerSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isActiveGame) return;

    const currentGameState = new Chess(position);
    const potentialMove = currentGameState
      .moves({ verbose: true })
      .find((move) => move.san === userAnswer);

    // If the submits something that isn't a valid move, notifiy them with a toast
    if (!potentialMove) {
      toast({
        title: "Bad move!",
        description: `Your move "${userAnswer}" is not a valid move in the current position. Please try again.`,
      });
      return;
    }

    // Update board and make it the bot's turn
    currentGameState.move(userAnswer);
    setActiveChess(currentGameState);
    setPosition(currentGameState.fen());
    setUserAnswer("");
    setActiveColor(userColor === "white" ? "black" : "white");
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
      setActiveChess(newGameState);
      setPosition(newGameState.fen());
      setUserAnswer("");
      setActiveColor(userColor === "white" ? "black" : "white");
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
        className="flex gap-2 align-center w-full sm:w-[80%] lg:w-[70%] mx-auto mb-4 max-w-3xl"
      >
        <Input
          className="flex-1 basis-10/12"
          style={{
            border: `2px solid black`,
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

      <div className="touch-none mb-6 w-full sm:w-[80%] lg:w-[70%]">
        <Chessboard
          id="NotationTrainer"
          position={position ?? defaultFen}
          showBoardNotation={gameOptions.showCoordinates}
          boardOrientation={userColor}
          customBoardStyle={{
            marginBottom: "20px",
          }}
          customDndBackend={isMobile() ? TouchBackend : undefined}
          arePiecesDraggable={isActiveGame}
          onPieceDrop={handleMoveDrop}
          onPromotionPieceSelect={handlePromotion}
          onPieceDragBegin={() => {
            console.log("hi world!");
          }}
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
            <AlertDialogTitle>Game Over!</AlertDialogTitle>
            <AlertDialogDescription>{endGameMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleReset}>
              Play Again
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() => navigate("/play-bot/instructions")}
            >
              Back to Game Settings
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PlayBot;
