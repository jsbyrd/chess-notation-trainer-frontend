import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  useEffect,
} from "react";

interface User {
  username: string;
  password: string;
  isLoggedIn: boolean;
  handleLogin: (username: string, password: string) => void;
  handleLogout: () => void;
}

const UserContext = createContext<User | undefined>(undefined);

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

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    // Check sessionStorage for existing credentials
    const storedUsername = sessionStorage.getItem("username");
    const storedPassword = sessionStorage.getItem("password");

    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
    } else {
      // Initialize with a random username if no stored credentials
      setUsername(generateRandomUsername(12));
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    setUsername(username);
    setPassword(password);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("password", password);
  };

  const handleLogout = () => {
    setUsername(generateRandomUsername(12));
    setPassword("");
    sessionStorage.clear();
  };

  const isLoggedIn = useMemo(() => password !== "", [password]);

  const value = useMemo(
    () => ({ username, password, isLoggedIn, handleLogin, handleLogout }),
    [username, password, isLoggedIn]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Usage example:
// const { username, handleLogin } = useUser();
//
// // Call this after a successful login
// handleLogin(loggedInUsername, loggedInPassword);
