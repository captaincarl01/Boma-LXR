import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import Home from "./pages/Home";
import Collection from "./pages/Collection";

function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
          </Routes>
        </CartProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;