import React, { useState, useTransition } from "react";

const products = Array.from({ length: 10000 }, (_, i) => `Product ${i + 1}`);

function Temp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Defer the update of the filtered list
    startTransition(() => {
      const filtered = products.filter((product) =>
        product.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search products..."
        style={{ padding: "10px", width: "100%" }}
      />
      {isPending && <p>Loading results...</p>}
      <ul style={{ maxHeight: "400px", overflowY: "auto", marginTop: "10px" }}>
        {filteredProducts.map((product, index) => (
          <li key={index}>{product}</li>
        ))}
      </ul>
    </div>
  );
}

export default Temp;
