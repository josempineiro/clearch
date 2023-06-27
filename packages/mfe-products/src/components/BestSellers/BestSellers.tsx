import styles from "./BestSellers.module.css";

const BestSellers = () => {
  return (
    <div className={styles.root}>
      <h1>Best Sellers</h1>
      <ul>
        <li>Product 1</li>
        <li>Product 2</li>
        <li>Product 3</li>
      </ul>
    </div>
  );
};

export default BestSellers;
