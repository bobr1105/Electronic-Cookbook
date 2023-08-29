import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Pricing from "./components/pricing/Pricing";
import Home from "./components/home/Home";
import ResponsiveAppBar from "./components/appbar/appbar";
import Recipes from "./components/recipes/Recipes";
import RouteNotFound from "./RouteNotFound";

function App() {
  return (
    <BrowserRouter>
      <header className="App-header">
        <ResponsiveAppBar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="recipes" element={<Recipes />}>
          <Route path=":id" element={<Recipes />} />
        </Route>
        <Route path="*" element={<RouteNotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
