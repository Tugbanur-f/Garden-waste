import React from "react";
import Products from "./Components/Products";
import "./App.css";

function App() {
  return (
    <div className="App" style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <Products />
    </div>
  );
}

export default App;
