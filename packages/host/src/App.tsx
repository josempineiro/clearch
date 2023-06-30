import { Routes, Route } from "react-router-dom";
import { RemotePokemons } from "./remotes";

function App() {
  return (
    <div>
      <header>
        <h1>Host</h1>
      </header>
      <Routes>
        <Route path="/pokemons/*" element={<RemotePokemons />} />
      </Routes>
    </div>
  );
}

export default App;
