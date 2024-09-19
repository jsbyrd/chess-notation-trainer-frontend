import { createContext, ReactNode, useContext, useMemo } from "react";
import { fenStrings } from "@/utils/fenStrings";
import { ChessColor } from "./GameOptionProvider";

interface Fen {
  getRandomPosition: (color: ChessColor) => string;
}

const FenContext = createContext<Fen | undefined>(undefined);

export const FenProvider = ({ children }: { children: ReactNode }) => {
  const whitePositions = useMemo(() => {
    return fenStrings.filter((fen) => fen.split(" ")[1] === "w");
  }, []);

  const blackPositions = useMemo(() => {
    return fenStrings.filter((fen) => fen.split(" ")[1] === "b");
  }, []);

  const getRandomPosition = (color: ChessColor): string => {
    if (color === "random")
      return fenStrings[Math.floor(Math.random() * fenStrings.length)];
    else if (color === "white")
      return whitePositions[Math.floor(Math.random() * whitePositions.length)];
    else if (color === "black")
      return blackPositions[Math.floor(Math.random() * blackPositions.length)];
    else return fenStrings[Math.floor(Math.random() * fenStrings.length)]; // Should never execute
  };

  return (
    <FenContext.Provider
      value={{
        getRandomPosition,
      }}
    >
      {children}
    </FenContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFen = () => {
  const context = useContext(FenContext);
  if (!context) {
    throw new Error("useGameOptions must be used within a GameOptionsProvider");
  }
  return context;
};
