import { createContext, useContext, ReactNode, useMemo, useState } from "react";

interface User {
  username: string;
  setUsername: (name: string) => void;
}

const UserContext = createContext<User | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Function to generate a random username
  const generateRandomUsername = (length: number) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "*USER";
    for (let i = 5; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Initialize the username with a random one
  const [username, setUsername] = useState<string>(
    useMemo(() => generateRandomUsername(12), [])
  );

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// const { username, setUsername } = useUser();

// // Call this after a successful login
// setUsername(loggedInUsername);
