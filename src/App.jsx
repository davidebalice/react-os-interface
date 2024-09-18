import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Desktop from "./components/Desktop";
import Info from "./components/Info";
import { OsProvider } from "./context/Context";
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
        element: <Desktop />,
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
    <OsProvider>
      <RouterProvider router={router} />
    </OsProvider>
  );
}

export default App;
