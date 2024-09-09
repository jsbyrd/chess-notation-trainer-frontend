import React, { createContext, PropsWithChildren } from "react";
import { fenStrings } from "@/utils/fenStrings";
// import { processPGN } from "@/utils/pgnToFen";
// import { pgnText } from "@/utils/pgnText";

// Create the context
export const FenContext = createContext<string[]>([]);

// Create the provider component
export const FenProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // const uniqueFenStrings = useMemo(() => {
  //   if (!pgnText) return [];
  //   const fenStrings = processPGN(pgnText);
  //   // Remove duplicates to get unique board positions
  //   return Array.from(new Set(fenStrings));
  // }, []);

  return (
    <FenContext.Provider value={fenStrings}>{children}</FenContext.Provider>
  );
};
