import { Link, useLocation } from "react-router-dom";
import { usePokemonsQuery } from "../../infrastructure/graphql/generated/graphql";
import styles from "./PokemonList.module.css";

const PokemonList = () => {
  const { data, loading, error } = usePokemonsQuery({
    onError: (error) => {
      console.log(error);
    },
  });
  console.log(useLocation());
  if (loading) {
    return <div>Loading pokemon...</div>;
  }
  if (error || !data) {
    return <p>Error loading pokemon...</p>;
  }
  return (
    <div className={styles.root}>
      <ul>
        {data.pokemons.map((pokemon) => (
          <li>
            <Link to={`${pokemon.id}`}>
              <h2>{pokemon.id}</h2>
              <p>{pokemon.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
