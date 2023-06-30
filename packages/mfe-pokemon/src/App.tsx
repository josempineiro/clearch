import "./App.css";
import Pokemons from "./modules/Pokemons";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Pokemons />
    </BrowserRouter>
  );
}

export default App;
