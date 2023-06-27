import React, { lazy, Suspense } from "react";

const BestSellers = lazy(() => import("remotePokemon/BestSellers"));
const PokemonDetails = lazy(() => import("remotePokemon/PokemonDetails"));

function App() {
  return (
    <>
      <div className="card">
        <Suspense fallback={<div>Loading BestSellers...</div>}>
          <BestSellers />
        </Suspense>
        <Suspense fallback={<div>Loading PokemonDetails...</div>}>
          <PokemonDetails id="1" />
        </Suspense>
      </div>
    </>
  );
}

export default App;
