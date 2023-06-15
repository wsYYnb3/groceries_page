import React from "react";

const ShoppingCart = ({
  shoppingList,
  removeFromShoppingCart,
  incrementItem,
  decrementItem,
}) => {
  const handleRemoveFromCart = (item) => {
    removeFromShoppingCart(item.id);
  };

  const handleIncrementItem = (item) => {
    incrementItem(item.id);
  };

  const handleDecrementItem = (item) => {
    decrementItem(item.id);
  };

  return (
    <div className="shopping-cart">
      {shoppingList.map((item) => (
        <div className="cart-item" key={item.id}>
          <div className="cart-item-details">
            <img
              src={item.thumbnail}
              alt={item.name}
              className="cart-item-img"
            />
            <div className="cart-item-info">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">
                ${item.price} ({item.quantity})
              </p>
            </div>
          </div>
          <div className="cart-item-actions">
            <button
              className="cart-item-action-btn"
              onClick={() => handleDecrementItem(item)}
            >
              -
            </button>
            <button
              className="cart-item-action-btn"
              onClick={() => handleIncrementItem(item)}
            >
              +
            </button>
            <button
              className="cart-item-remove-btn"
              onClick={() => handleRemoveFromCart(item)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShoppingCart;
