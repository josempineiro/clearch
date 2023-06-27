import React, { lazy, Suspense } from "react";

const BestSellers = lazy(() => import("remoteProducts/BestSellers"));
const ProductDetails = lazy(() => import("remoteProducts/ProductDetails"));

function App() {
  return (
    <>
      <div className="card">
        <Suspense fallback={<div>Loading BestSellers...</div>}>
          <BestSellers />
        </Suspense>
        <Suspense fallback={<div>Loading ProductDetails...</div>}>
          <ProductDetails id="1" />
        </Suspense>
      </div>
    </>
  );
}

export default App;
