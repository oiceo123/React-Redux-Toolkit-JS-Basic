import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Signin from "./pages/Signin";

import { useSelector } from "react-redux";

import "./App.css";

const unAuthRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
    ],
  },
]);

const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {!user ? (
        <RouterProvider router={unAuthRouter} />
      ) : (
        <RouterProvider router={authRouter} />
      )}
    </>
  );
}

export default App;
