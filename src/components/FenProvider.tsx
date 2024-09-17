import { createContext, ReactNode, useContext } from "react";
import { fenStrings } from "@/utils/fenStrings";

interface Fen {
  getRandomPosition: () => string;
}

const FenContext = createContext<Fen | undefined>(undefined);

export const FenProvider = ({ children }: { children: ReactNode }) => {
  const getRandomPosition = (): string => {
    return fenStrings[Math.floor(Math.random() * fenStrings.length)];
  };

  return (
    <FenContext.Provider value={{ getRandomPosition }}>
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
