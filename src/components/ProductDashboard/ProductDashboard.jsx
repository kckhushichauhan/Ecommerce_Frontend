import React, { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import AddProducts from "../AddProducts/AddProducts";
import "./ProductDashboard.css";

const ProductDashboard = ({ products, addToCart, removeFromCart, updateProductList }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleAddProduct = (newProduct) => {
    updateProductList((prevProducts) => [...prevProducts, newProduct]);
    setShowAddProduct(false);
  };

  const closeModal = () => {
    setShowAddProduct(false);
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === "price-asc") {
      return a.price - b.price;
    } else if (sortOption === "price-desc") {
      return b.price - a.price;
    } else if (sortOption === "name-asc") {
      return a.productName.localeCompare(b.productName);
    } else if (sortOption === "name-desc") {
      return b.productName.localeCompare(a.productName);
    }
    return 0;
  });

  return (
    <div className="product-container">
      <div className="search-bar" tabIndex={0}>
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="controls">
        <select value={sortOption} onChange={handleSortChange}>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>

        <button
          className="update-product-list"
          onClick={() => {
            updateProductList();
          }}
        >
          Update Product List
        </button>
      </div>
      <div className="product-list">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
      {showAddProduct && (
        <AddProducts addProduct={handleAddProduct} closeModal={closeModal} />
      )}
    </div>
  );
};

export default ProductDashboard;
