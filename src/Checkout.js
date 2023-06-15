import React, { useState } from "react";

const Checkout = ({
  shoppingList,
  clearShoppingCart,
  groceries,
  setGroceries,
}) => {
  const [receiptVisible, setReceiptVisible] = useState(false);

  const handleCheckout = () => {
    setReceiptVisible(true);
  };

  const handlePay = () => {};

  const handleCancel = () => {
    setReceiptVisible(false);

    const updatedGroceries = groceries.map((grocery) => {
      const shoppingCartItem = shoppingList.find(
        (item) => item.id === grocery.id
      );
      if (shoppingCartItem) {
        return {
          ...grocery,
          quantity: grocery.quantity + shoppingCartItem.quantity,
        };
      }
      return grocery;
    });

    setGroceries(updatedGroceries);

    clearShoppingCart();
  };

  const calculateTotal = () => {
    return shoppingList.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const isCartEmpty = calculateTotal() === 0;

  return (
    <div className="checkout">
      <button className="checkout-btn" onClick={handleCheckout}>
        Checkout
      </button>
      {receiptVisible && (
        <div className="receipt">
          <h2 className="receipt-title">Receipt</h2>
          {isCartEmpty ? (
            <div className="empty-cart-message">Your cart is empty.</div>
          ) : (
            <>
              <div className="receipt-items">
                {shoppingList.map((item) => (
                  <div className="receipt-item" key={item.id}>
                    <div className="receipt-item-details">
                      <span className="receipt-item-name">{item.name}</span>
                      <span className="receipt-item-quantity">
                        {item.quantity}
                      </span>
                    </div>
                    <span className="receipt-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="receipt-total">
                <span>Total:</span>
                <span className="receipt-total-amount">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
              {
                <div className="payment-options">
                  <button className="payment-btn" onClick={handlePay}>
                    Pay
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              }
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkout;
