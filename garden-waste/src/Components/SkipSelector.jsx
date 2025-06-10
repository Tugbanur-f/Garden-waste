import React, { useState, useEffect } from "react";

function SkipSelector() {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft",
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setSkips(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading skip options...</p>;
  if (error) return <p>Error loading skips: {error}</p>;

  return (
    <div className="skip-options-container">
      <h1>Choose Your Skip Size</h1>
      {skips.map((skip) => {
        // Calculate price with VAT
        const priceWithVAT = (skip.price_before_vat * 1.2).toFixed(2);

        return (
          <div key={skip.id} className="skip-card">
            <h3>{skip.size} yd³ Skip</h3>
            <p>Hire period: {skip.hire_period_days} days</p>
            <p>Price (incl. VAT): £{priceWithVAT}</p>
            <button>Select</button>
          </div>
        );
      })}
    </div>
  );
}

export default SkipSelector;
