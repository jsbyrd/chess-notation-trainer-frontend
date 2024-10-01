import { useCallback, useState } from "react";
import {
  createGame,
  joinGame,
  CreateGameRequestDTO,
  JoinGameRequestDTO,
} from "@/services/gameService";
import PlayHumanGame from "./PlayHumanGame";
import PlayHumanSettings from "./PlayHumanSettings";
import PlayHumanWaiting from "./PlayHumanWaiting";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";
import { useUser } from "@/components/UserProvider";

type GameState = "ACTIVE" | "WAITING" | "ENDED" | "SETTINGS";

const DEFAULT_GAME_STATE = "SETTINGS";
const SOCKET_URL = "http://localhost:8080"; // TODO: Replace with ENV variable

const PlayHumanManager = () => {
  const { username } = useUser();
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE);
  const [colorPreference, setColorPreference] = useState("random");
  const [gameId, setGameId] = useState<string | undefined>("test");
  const [move, setMove] = useState<string | undefined>(undefined);
  const [opponentName, setOpponentName] = useState<string | undefined>(
    undefined
  );

  const handleColorChange = (color: string) => {
    setColorPreference(color);
  };

  const handleGameIdChange = (gameId: string) => {
    setGameId(gameId);
  };

  const handleSocketConnection = useCallback(
    (gameId: string) => {
      console.log("connecting to the game");
      const socket = new SockJS(SOCKET_URL + "/chess-game");
      const stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        console.log("connected to the frame: " + frame);
        stompClient.subscribe(
          "/topic/game-progress/" + gameId,
          function (response) {
            let data = JSON.parse(response.body);
            console.log("Updating gameId", data.gameId);
            // if (!data.gameId) setGameId(data.gameId);
            // Update Game State
            if (data.gameState && data.gameState !== gameState)
              setGameState(data.gameState);
            // Update Move
            if (data.move) setMove(data.move);
            // Update Opponent Name when a game starts
            if (!opponentName && data.gameState === "ACTIVE") {
              if (username === data.player1Id) setOpponentName(data.player2Id);
              else setOpponentName(data.player1Id);
            }
          }
        );
      });
    },
    [gameState, opponentName, username]
  );

  const handleCreateGame = useCallback(async () => {
    let color = colorPreference;
    if (color === "random") {
      color = Math.random() < 0.5 ? "white" : "black";
    }

    const reqBody: CreateGameRequestDTO = {
      playerId: username,
      color: color,
    };

    const res = await createGame(reqBody);
    handleSocketConnection(res.gameId);
    setGameId(res.gameId);
    setGameState("WAITING");
  }, [colorPreference, handleSocketConnection, username]);

  const handleJoinGame = useCallback(async () => {
    const reqBody: JoinGameRequestDTO = {
      gameId: gameId ?? "",
      playerId: username,
    };

    const res = await joinGame(reqBody);

    handleSocketConnection(gameId ?? "");
    setOpponentName(res.player1Id);
    setColorPreference(res.player2Color);
    setGameId(res.gameId);
    setGameState(res.gameState);
  }, [gameId, handleSocketConnection, username]);

  const renderAppropriatePage = useCallback(() => {
    switch (gameState) {
      case "ACTIVE":
        return (
          <PlayHumanGame
            move={move}
            username={username}
            opponentName={opponentName}
            playerColor={colorPreference}
            gameId={gameId}
          />
        );
      case "WAITING":
        return <PlayHumanWaiting gameId={gameId} />;
      case "ENDED":
        return (
          <PlayHumanGame
            move={move}
            username={username}
            opponentName={opponentName}
            playerColor={colorPreference}
            gameId={gameId}
          />
        );
      case "SETTINGS":
        return (
          <PlayHumanSettings
            handleJoinGame={handleJoinGame}
            handleCreateGame={handleCreateGame}
            colorPreference={colorPreference}
            handleColorChange={handleColorChange}
            gameId={gameId}
            handleGameIdChange={handleGameIdChange}
          />
        );
      default:
        return (
          <PlayHumanSettings
            handleJoinGame={handleJoinGame}
            handleCreateGame={handleCreateGame}
            colorPreference={colorPreference}
            handleColorChange={handleColorChange}
            gameId={gameId}
            handleGameIdChange={handleGameIdChange}
          />
        );
    }
  }, [
    gameState,
    move,
    username,
    opponentName,
    colorPreference,
    gameId,
    handleJoinGame,
    handleCreateGame,
  ]);

  return renderAppropriatePage();
};

export default PlayHumanManager;
