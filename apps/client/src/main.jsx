import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./index.css";
import App from "./App.jsx";
import { ToastProvider } from "./components/shadCN/toast/toast.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecoilRoot>
      <Router>
        <ToastProvider>
          <App />
        </ToastProvider>
      </Router>
    </RecoilRoot>
  </StrictMode>
);
