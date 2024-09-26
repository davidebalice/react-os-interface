import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Desktop from "./components/Desktop";
import Info from "./components/Info";
import { OsProvider } from "./context/Context";
import Layout from "./pages/Layout";
import LoginScreen from "./pages/LoginScreen";
import { token_decode } from "./utils/index";

const userInfo = token_decode(localStorage.getItem("token"));

const router = createBrowserRouter([
  {
    path: "/",
    element: userInfo ? <Layout /> : <LoginScreen />,
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
