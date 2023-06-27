import React, { lazy, Suspense } from "react";

const BestSellers = lazy(() => import("remoteApp/BestSellers"));

function App() {
  return (
    <>
      <div className="card">
        <Suspense fallback={<div>Loading Remote Component...</div>}>
          <BestSellers />
        </Suspense>
      </div>
    </>
  );
}

export default App;
