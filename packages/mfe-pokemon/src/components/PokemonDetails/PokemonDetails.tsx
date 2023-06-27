import styles from "./PokemonDetails.module.css";

interface Price {
  amount: number;
  currency: string;
}

type ProcuctId = string;

interface Pokemon {
  id: ProcuctId;
  name: string;
  description: string;
  price: Price;
  images: Array<string>;
}

const createAPokemon = (id: ProcuctId): Pokemon => ({
  id,
  name: `Pokemon name ${id}`,
  description: `Pokemon description ${id}`,
  price: { amount: 99.99, currency: "EUR" },
  images: [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ],
});

const usePokemon = (id: string): { product: Pokemon } => {
  return {
    product: createAPokemon(id),
  };
};

const PokemonDetails = ({ id }: { id: ProcuctId }) => {
  const { product } = usePokemon(id);
  return (
    <div className={styles.root}>
      <h1>PokemonDetails</h1>
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <span>
          <span>{product.price.amount}</span>
          <span>{product.price.currency}</span>
        </span>
      </div>
    </div>
  );
};

export default PokemonDetails;
