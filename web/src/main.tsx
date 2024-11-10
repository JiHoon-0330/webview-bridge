import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./pages/app";
import CacheWeb from "./pages/cache-web";
import SetWeb from "./pages/set-web";
import Web from "./pages/web";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/web",
    element: <Web />,
  },
  {
    path: "/set-web",
    element: <SetWeb />,
  },
  {
    path: "/cache-web",
    element: <CacheWeb />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
