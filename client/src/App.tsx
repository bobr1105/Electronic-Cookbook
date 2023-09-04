import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import ResponsiveAppBar from "./components/appbar/appbar";
import Recipes from "./components/recipes/Recipes";
import RouteNotFound from "./RouteNotFound";
import Admin from "./components/admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <header className="App-header">
        <ResponsiveAppBar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        {recipeRoutes()}
        {adminRoutes()}
        <Route path="*" element={<RouteNotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

function recipeRoutes() {
  return (
    <>
      <Route path="recipes" element={<Recipes />}>
        <Route path=":id" element={<Recipes />} />
      </Route>
    </>
  )
}

function adminRoutes() {
  return (
    <>
      <Route path="admin" element={<Admin />}>
      </Route>
    </>
  )
}

export default App;
