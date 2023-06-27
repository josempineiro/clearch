import styles from "./BestSellers.module.css";

const BestSellers = () => {
  return (
    <div className={styles.root}>
      <h1>Best Sellers</h1>
      <ul>
        <li>Pokemon 1</li>
        <li>Pokemon 2</li>
        <li>Pokemon 3</li>
      </ul>
    </div>
  );
};

export default BestSellers;
