import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./pages/app";
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
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
