import React, { useState, useEffect } from "react";
import getSkipDetails from "../utils/GetSkipDetails";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft",
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("API error");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="products-container">
      <h1>Choose Your Skip Size</h1>
      <p>Select the skip size that best suits your needs</p>

      {products.map((product) => {
        const details = getSkipDetails(product.size);

        const priceWithVAT = product.price_before_vat.toFixed(2);

        return (
          <div key={product.id} className="product-card">
            <img
              src={details.image}
              alt={details.name}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
            <h3>{details.name}</h3>
            <p>{details.description}</p>
            <p>Capacity: {details.capacity} bags</p>
            <p>Hire Period: {product.hire_period_days} days</p>
            <p>Price: £{priceWithVAT}</p>
            <button>Select</button>
          </div>
        );
      })}
    </div>
  );
}

export default Products;
