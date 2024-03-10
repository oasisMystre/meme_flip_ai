import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { ToastContainer } from "react-toastify";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { TelegramWebAppProvider } from "@telegram-web-app/react";

import "./index.css";
import HomePage from "./pages";
import GetMemeProvider from "./providers/GetMemeProvider";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TelegramWebAppProvider>
      <div className="fixed inset-0 flex flex-col bg-[var(--tg-theme-bg-color)] text-[var(--tg-theme-text-color)]  overflow-y-scroll font-sans">
        <GetMemeProvider>
          <RouterProvider router={router} />
          <ToastContainer style={{ zIndex: 50 }} />
        </GetMemeProvider>
      </div>
    </TelegramWebAppProvider>
  </React.StrictMode>
);
