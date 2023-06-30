import { Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { PokemonsPage, PokemonPage } from "../pages";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const Pokemons = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>Pokemons microfrontend</h2>
        <Routes>
          <Route path="/:id" element={<PokemonPage />} />
          <Route path="/" element={<PokemonsPage />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
};

export default Pokemons;
