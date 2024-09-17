import { createContext, useContext, useState, ReactNode } from "react";

export type ChessColor = "white" | "black" | "random";

interface GameOptions {
  color: ChessColor;
  showCoordinates: boolean;
  isTimed: boolean;
  setOptions: (options: Partial<GameOptions>) => void;
  resetOptions: () => void;
}

const GameOptionsContext = createContext<GameOptions | undefined>(undefined);

export const GameOptionsProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptionsState] = useState<GameOptions>({
    color: "white",
    showCoordinates: true,
    isTimed: true,
    setOptions: () => {},
    resetOptions: () => {},
  });

  const setOptions = (newOptions: Partial<GameOptions>) => {
    setOptionsState((prevOptions) => ({
      ...prevOptions,
      ...newOptions,
    }));
  };

  const resetOptions = () => {
    setOptions({
      color: "white",
      showCoordinates: true,
    });
  };

  return (
    <GameOptionsContext.Provider
      value={{ ...options, setOptions, resetOptions }}
    >
      {children}
    </GameOptionsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGameOptions = () => {
  const context = useContext(GameOptionsContext);
  if (!context) {
    throw new Error("useGameOptions must be used within a GameOptionsProvider");
  }
  return context;
};
