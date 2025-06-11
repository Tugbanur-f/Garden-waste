import React, { useState, useEffect } from "react";
import "../App.css";

function SkipSelector() {
  const [skips, setSkips] = useState([]);
  const [filteredSkips, setFilteredSkips] = useState([]);
  const [searchYard, setSearchYard] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSkips, setSelectedSkips] = useState({});

  useEffect(() => {
    fetch(
      "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft",
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        const sortedSkips = data.sort((a, b) => a.size - b.size);
        setSkips(sortedSkips);
        setFilteredSkips(sortedSkips);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchYard.trim() === "") {
      setFilteredSkips(skips);
    } else {
      const target = parseInt(searchYard);
      if (!isNaN(target)) {
        const filtered = skips.filter((skip) => skip.size === target);
        setFilteredSkips(filtered);
      }
    }
  }, [searchYard, skips]);

  const toggleSelect = (id) => {
    setSelectedSkips((prev) => {
      if (prev[id]) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: 1 };
    });
  };

  const updateQuantity = (id, delta) => {
    setSelectedSkips((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  if (loading) return <p className="loading">Loading skip options...</p>;
  if (error) return <p className="error">Error loading skips: {error}</p>;

  return (
    <div className="skip-selector">
      <h1 className="title">Choose Your Skip Size</h1>
      <p className="subtitle">
        Select the skip size that best suits your needs
      </p>

      <div className="search-container">
        <input
          type="number"
          placeholder="Enter yard size (e.g. 6)"
          value={searchYard}
          onChange={(e) => setSearchYard(e.target.value)}
          onFocus={() => setSearchYard("")} //
        />
      </div>

      <div className="skip-grid">
        {filteredSkips.map((skip) => {
          const price = skip.price_before_vat;
          const imagePath = `/img/skip.jpeg`;
          const isSelected = selectedSkips[skip.id];

          return (
            <div
              key={skip.id}
              className={`skip-card ${isSelected ? "selected-card" : ""}`}
            >
              <div className="skip-image-container">
                <img
                  src={imagePath}
                  alt={`${skip.size} Yard Skip`}
                  className="skip-image"
                />
                <span className="yard-label">{skip.size} Yards</span>
              </div>
              <div className="skip-info">
                <h3>{skip.size} Yard Skip</h3>
                <p>{skip.hire_period_days} day hire period</p>
                <p className="price">£{price}</p>
                {!skip.allowed_on_road && (
                  <p className="warning">⚠️ Not Allowed On The Road</p>
                )}

                {isSelected ? (
                  <div className="quantity-container">
                    <span className="selected-text">Selected</span>
                    <div className="quantity-buttons">
                      <button onClick={() => updateQuantity(skip.id, -1)}>
                        -
                      </button>
                      <span>{selectedSkips[skip.id]}</span>
                      <button onClick={() => updateQuantity(skip.id, 1)}>
                        +
                      </button>
                    </div>
                    <button
                      className="cancel-button"
                      onClick={() => toggleSelect(skip.id)}
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <button
                    className="select-button"
                    onClick={() => toggleSelect(skip.id)}
                  >
                    Select
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SkipSelector;
