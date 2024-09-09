import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Template from "./pages/Template";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Learn from "./pages/Learn";
import MakeThatMove from "./pages/MakeThatMove";
import NameThatNotation from "./pages/NameThatNotation";
import Analytics from "./pages/Analytics";
import PlayHuman from "./pages/PlayHuman";
import PlayBot from "./pages/PlayBot";
import { FenProvider } from "./components/FenProvider";
import Settings from "./pages/Settings";
import ReportBug from "./pages/ReportBug";

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
        element: <MakeThatMove />,
      },
      {
        path: "/name-notation",
        element: <NameThatNotation />,
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
    <FenProvider>
      <RouterProvider router={router} />
    </FenProvider>
  );
};
