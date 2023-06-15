import React from "react";

const Groceries = ({ groceries, addToShoppingCart }) => {
  const handleAddToCart = (item) => {
    if (item.quantity > 0) {
      addToShoppingCart(item.id);
    }
  };

  return (
    <div className="groceries">
      {groceries.map((item) => (
        <div
          className={`grocery-item ${
            item.quantity === 0 ? "out-of-stock" : ""
          }`}
          key={item.id}
          onClick={() => handleAddToCart(item)}
        >
          <img
            src={item.thumbnail}
            alt={item.name}
            className="grocery-item-img"
          />
          <div className="grocery-item-details">
            <h3 className="grocery-item-name">{item.name}</h3>
            <p className="grocery-item-price">
              ${item.price} (
              {item.quantity === 0 ? "Out of Stock" : `${item.quantity} left`})
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Groceries;
