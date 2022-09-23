import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeProvider from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <ModalsProvider>
        <NotificationsProvider position="top-right" zIndex={100}>
          <App />
        </NotificationsProvider>
      </ModalsProvider>
    </ThemeProvider>
  </React.StrictMode>
);
