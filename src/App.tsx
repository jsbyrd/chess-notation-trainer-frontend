import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Learn from "./pages/Learn";
import { MakeThatMove } from "./pages/MakeThatMove";
import { FenProvider } from "./components/FenProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/make-move",
    element: <MakeThatMove />,
  },
  {
    path: "/learn",
    element: <Learn />,
  },
]);

export const App = () => {
  return (
    <FenProvider>
      <RouterProvider router={router} />;
    </FenProvider>
  );
};
