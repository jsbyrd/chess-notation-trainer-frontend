import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Template from "./pages/Template";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Learn from "./pages/Learn";
import MakeMoveInstructions from "./pages/MakeMoveInstructions";
import Analytics from "./pages/Analytics";
import PlayHuman from "./pages/PlayHuman";
import PlayBot from "./pages/PlayBot";
import { FenProvider } from "./components/FenProvider";
import Settings from "./pages/Settings";
import ReportBug from "./pages/ReportBug";
import MakeMoveGame from "./pages/MakeMoveGame";
import { GameOptionsProvider } from "./components/GameOptionProvider";
import NameNotationInstructions from "./pages/NameNotationInstructions";
import NameNotationGame from "./pages/NameNotationGame";

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
        element: <PlayHuman />,
      },
      {
        path: "/play-bot",
        element: <PlayBot />,
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
      </FenProvider>
    </GameOptionsProvider>
  );
};
