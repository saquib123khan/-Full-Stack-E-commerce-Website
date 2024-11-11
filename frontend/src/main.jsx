import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter future={{ 
    v7_relativeSplatPath: true,
    v7_startTransition: true 
  }}>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>
);
