import styles from "./ProductDetails.module.css";

interface Price {
  amount: number;
  currency: string;
}

type ProcuctId = string;

interface Product {
  id: ProcuctId;
  name: string;
  description: string;
  price: Price;
  images: Array<string>;
}

const createAProduct = (id: ProcuctId): Product => ({
  id,
  name: `Product name ${id}`,
  description: `Product description ${id}`,
  price: { amount: 99.99, currency: "EUR" },
  images: [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ],
});

const useProduct = (id: string): { product: Product } => {
  return {
    product: createAProduct(id),
  };
};

const ProductDetails = ({ id }: { id: ProcuctId }) => {
  const { product } = useProduct(id);
  return (
    <div className={styles.root}>
      <h1>ProductDetails</h1>
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

export default ProductDetails;
