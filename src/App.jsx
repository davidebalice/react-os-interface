import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Info from "./components/Info";
import { ComponentsProvider } from "./context/Context";
import Index from "./pages/Index";
import Layout from "./pages/Layout";
import { token_decode } from "./utils/index";

const userInfo = token_decode(localStorage.getItem("token"));

const router = createBrowserRouter([
  {
    path: "/",
    element: userInfo ? <Layout /> : <Index />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/info",
        element: <Info />,
      },
    ],
  },
]);

function App() {
  return (
    <ComponentsProvider>
      <RouterProvider router={router} />
    </ComponentsProvider>
  );
}

export default App;
