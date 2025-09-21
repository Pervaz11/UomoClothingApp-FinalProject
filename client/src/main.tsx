// main.tsx / index.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { WishlistProvider } from "./context/WishlistContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
