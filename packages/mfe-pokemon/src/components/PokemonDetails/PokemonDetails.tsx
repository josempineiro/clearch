import { usePokemonQuery } from "../../infrastructure/graphql/generated/graphql";
import styles from "./PokemonDetails.module.css";

const PokemonDetails = ({ id }: { id: string }) => {
  const { data, loading, error } = usePokemonQuery({
    variables: { id },
    onError: (error) => {
      console.log(error);
    },
  });
  if (loading) {
    return <div>Loading pokemon...</div>;
  }
  if (error) {
    return <p>Error loading pokemon...</p>;
  }
  if (data) {
    return (
      <div className={styles.root}>
        <h1>PokemonDetails</h1>
        <div>
          <h2>{data.pokemon.id}</h2>
          <p>{data.pokemon.name}</p>
        </div>
      </div>
    );
  }
};

export default PokemonDetails;
