import { Chess } from "chess.js";

export enum EndGameState {
  ACTIVE_GAME,
  CHECKMATE,
  FIFTY_MOVE,
  INSUFFICIENT_MATERIAL,
  STALEMATE,
  THREEFOLD_REPETITION,
}

export const getEndGameState = (chess: Chess): EndGameState => {
  if (!chess.isGameOver()) return EndGameState.ACTIVE_GAME;
  else if (chess.isCheckmate()) return EndGameState.CHECKMATE;
  else if (chess.isThreefoldRepetition())
    return EndGameState.THREEFOLD_REPETITION;
  else if (chess.isStalemate()) return EndGameState.STALEMATE;
  else if (chess.isInsufficientMaterial())
    return EndGameState.INSUFFICIENT_MATERIAL;
  else return EndGameState.FIFTY_MOVE;
};

export const getEndGameMessage = (
  endGameState: EndGameState,
  didUserWin: boolean
): string => {
  let endGameMessage = "";
  switch (endGameState) {
    case EndGameState.CHECKMATE:
      endGameMessage = didUserWin
        ? "You WIN! Congratulations!"
        : "You LOSE! Tough luck...";
      break;
    case EndGameState.FIFTY_MOVE:
      endGameMessage = "DRAW by FIFTY MOVE rule";
      break;
    case EndGameState.INSUFFICIENT_MATERIAL:
      endGameMessage = "DRAW by INSUFFICIENT MATERIAL";
      break;
    case EndGameState.STALEMATE:
      endGameMessage = "DRAW by STALEMATE";
      break;
    case EndGameState.THREEFOLD_REPETITION:
      endGameMessage = "DRAW by THREEFOLD REPETITION";
      break;
    default:
      endGameMessage = "If you see this, do feel free to report this as a bug";
      break;
  }
  return endGameMessage;
};
