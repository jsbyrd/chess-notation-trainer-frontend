import { useCallback, useEffect, useState } from "react";
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
import { toast } from "@/hooks/use-toast";

export type GameState = "ACTIVE" | "WAITING" | "ENDED" | "SETTINGS";

const DEFAULT_GAME_STATE = "SETTINGS";
const SOCKET_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const PlayHumanManager = () => {
  const { username } = useUser();
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE);
  const [colorPreference, setColorPreference] = useState("random");
  const [gameId, setGameId] = useState<string | undefined>("");
  const [move, setMove] = useState<string | undefined>(undefined);
  const [endGameMessage, setEndGameMessage] = useState("");
  const [opponentName, setOpponentName] = useState<string | undefined>(
    undefined
  );
  const [gameStompClient, setGameStompClient] = useState<
    Stomp.Client | undefined
  >(undefined);

  const disconnectWebSocket = () => {
    if (gameStompClient) {
      gameStompClient.disconnect(() => {});
    }
  };

  useEffect(() => {
    return () => {
      if (gameStompClient) {
        disconnectWebSocket();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStompClient]);

  const handleGameStateChange = (gameState: GameState) => {
    setGameState(gameState);
  };

  const handleColorChange = (color: string) => {
    setColorPreference(color);
  };

  const handleGameIdChange = (gameId: string) => {
    setGameId(gameId);
  };

  const handleSocketConnection = useCallback(
    (gameId: string) => {
      const socket = new SockJS(SOCKET_URL + "/chess-game");
      const stompClient = Stomp.over(socket);
      stompClient.connect({}, () => {
        // Tell username to server
        stompClient.send(
          "/app/game.addUser",
          {},
          JSON.stringify({ playerId: username, gameId: gameId ?? "" })
        );

        // Subscribe to appropriate game
        stompClient.subscribe(
          "/topic/game-progress/" + gameId,
          function (response) {
            const data = JSON.parse(response.body);
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

        // Subscribe to opponent disconnect notifications
        stompClient.subscribe(
          "/topic/game-disconnect/" + username,
          function (message) {
            setEndGameMessage(message.body);
          }
        );
      });
      setGameStompClient(stompClient);
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

    if (res.error) {
      toast({
        title: "Error!",
        description: res.error,
        variant: "destructive",
      });
      return;
    }

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

    if (res.error) {
      toast({
        title: "Error!",
        description: res.error,
        variant: "destructive",
      });
      return;
    }

    handleSocketConnection(gameId ?? "");
    setOpponentName(res.player1Id);
    setColorPreference(res.player2Color);
    setGameId(res.gameId);
    setGameState(res.gameState);
  }, [gameId, handleSocketConnection, username]);

  const handleEndGameMessageChange = (endGameMessage: string) => {
    setEndGameMessage(endGameMessage);
  };

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
            endGameMessage={endGameMessage}
            handleEndGameMessageChange={handleEndGameMessageChange}
            handleGameStateChange={handleGameStateChange}
            disconnectWebSocket={disconnectWebSocket}
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
            endGameMessage={endGameMessage}
            handleEndGameMessageChange={handleEndGameMessageChange}
            handleGameStateChange={handleGameStateChange}
            disconnectWebSocket={disconnectWebSocket}
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
    endGameMessage,
    handleJoinGame,
    handleCreateGame,
  ]);

  return renderAppropriatePage();
};

export default PlayHumanManager;
