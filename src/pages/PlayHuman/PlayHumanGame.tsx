import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Button } from "@/components/ui/button";
import { useGameOptions } from "@/components/GameOptionProvider";
import { useNavigate } from "react-router-dom";
import { Chess } from "chess.js";
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
// import {
//   EndGameState,
//   getEndGameMessage,
//   getEndGameState,
// } from "@/utils/endGameUtils";
import { useToast } from "@/hooks/use-toast";
import { makeMove, MakeMoveDTO } from "@/services/gameService";
import {
  EndGameState,
  getEndGameMessage,
  getEndGameState,
} from "@/utils/endGameUtils";
import { isMobile } from "@/utils/isMobile";
import { TouchBackend } from "react-dnd-touch-backend";

const defaultFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

type PlayHumanGameProps = {
  move: string | undefined;
  username: string;
  opponentName: string | undefined;
  playerColor: string;
  gameId: string | undefined;
};

const PlayHumanGame = (props: PlayHumanGameProps) => {
  const { move, username, opponentName, playerColor, gameId } = props;
  const { toast } = useToast();
  const gameOptions = useGameOptions();
  const navigate = useNavigate();
  const [position, setPosition] = useState<string>(defaultFen);
  const [userAnswer, setUserAnswer] = useState("");
  const [endGameMessage, setEndGameMessage] = useState("");
  const [activeColor, setActiveColor] = useState<BoardOrientation>("white");
  const [showPopup, setShowPopup] = useState(false);
  const [isActiveGame, setIsActiveGame] = useState(true);

  // When we receive a move from websockets, update board state
  useEffect(() => {
    if (!move) return;
    // Make move
    const updatedGameState = new Chess(position);
    updatedGameState.move(move);
    setPosition(updatedGameState.fen());
    setUserAnswer("");
    setActiveColor(updatedGameState.turn() === "w" ? "white" : "black");

    // Check for endgame
    const endGameState = getEndGameState(updatedGameState);
    if (endGameState !== EndGameState.ACTIVE_GAME) {
      setIsActiveGame(false);
      setEndGameMessage(
        getEndGameMessage(endGameState, playerColor === activeColor)
      );
      setShowPopup(true);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [move]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  const handleAnswerSubmission = async (e: React.FormEvent) => {
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

    const reqBody: MakeMoveDTO = {
      playerId: username,
      gameId: gameId ?? "",
      move: userAnswer,
    };

    await makeMove(reqBody);
  };

  const handleMoveDrop = async (
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

      const moveMade = newGameState.history()[0];

      const reqBody: MakeMoveDTO = {
        playerId: username,
        gameId: gameId ?? "",
        move: moveMade,
      };

      await makeMove(reqBody);

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
      <h1 className="text-3xl font-bold text-center mb-6">
        Playing Against {opponentName}
      </h1>
      <form
        onSubmit={handleAnswerSubmission}
        className="flex gap-2 align-center w-[85%] mx-auto px-4 pb-4 max-w-3xl"
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

      <div className="mb-6 w-full sm:w-[80%] lg:w-[70%]">
        <Chessboard
          id="NotationTrainer"
          position={position ?? defaultFen}
          showBoardNotation={gameOptions.showCoordinates}
          boardOrientation={playerColor as BoardOrientation}
          customBoardStyle={{
            marginBottom: "20px",
          }}
          arePiecesDraggable={isActiveGame && activeColor === playerColor}
          onPieceDrop={handleMoveDrop}
          onPromotionPieceSelect={handlePromotion}
          customDndBackend={isMobile() ? TouchBackend : undefined}
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
            {/* <AlertDialogAction onClick={handleReset}>
              Play Again
            </AlertDialogAction> */}
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

export default PlayHumanGame;
