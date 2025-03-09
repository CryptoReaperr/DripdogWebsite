import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AppContextProvider } from "./context/AppContext";

createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
