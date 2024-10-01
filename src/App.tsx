import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Template from "./pages/Template";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Learn from "./pages/Learn";
import MakeMoveInstructions from "./pages/MakeMoveInstructions";
import Analytics from "./pages/Analytics";
import PlayBot from "./pages/PlayBot";
import Settings from "./pages/Settings";
import ReportBug from "./pages/ReportBug";
import MakeMoveGame from "./pages/MakeMoveGame";
import NameNotationInstructions from "./pages/NameNotationInstructions";
import NameNotationGame from "./pages/NameNotationGame";
import PlayBotInstructions from "./pages/PlayBotInstructions";
import { Toaster } from "./components/ui/toaster";
import { GameOptionsProvider } from "./components/GameOptionProvider";
import { FenProvider } from "./components/FenProvider";
import PlayHumanManager from "./pages/PlayHuman/PlayHumanManager";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/learn",
        element: <Learn />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "/make-move",
        element: <Outlet />,
        children: [
          {
            path: "/make-move/instructions",
            element: <MakeMoveInstructions />,
          },
          {
            path: "/make-move/game",
            element: <MakeMoveGame />,
          },
        ],
      },
      {
        path: "/name-notation",
        element: <Outlet />,
        children: [
          {
            path: "/name-notation/instructions",
            element: <NameNotationInstructions />,
          },
          {
            path: "/name-notation/game",
            element: <NameNotationGame />,
          },
        ],
      },
      {
        path: "/play-human",
        element: <PlayHumanManager />,
      },
      {
        path: "/play-bot",
        element: <Outlet />,
        children: [
          {
            path: "/play-bot/instructions",
            element: <PlayBotInstructions />,
          },
          {
            path: "/play-bot/game",
            element: <PlayBot />,
          },
        ],
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "report-bug",
        element: <ReportBug />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export const App = () => {
  return (
    <GameOptionsProvider>
      <FenProvider>
        <RouterProvider router={router} />
        <Toaster />
      </FenProvider>
    </GameOptionsProvider>
  );
};
