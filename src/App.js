import React, { useState } from "react";
import Groceries from "./Groceries";
import ShoppingCart from "./ShoppingCart";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


const App = () => {
  const [groceries, setGroceries] = useState([
    {
      id: 1,
      name: "Apple",
      price: 0.3,
      quantity: 10,
      thumbnail: require("./assets/apple3.jpg"),
    },
    {
      id: 2,
      name: "Banana",
      price: 0.5,
      quantity: 10,
      thumbnail: require("./assets/banana.jpg"),
    },
    {
      id: 3,
      name: "Strawberry",
      price: 0.2,
      quantity: 5,
      thumbnail: require("./assets/strawberry.jpg"),
    },
    {
      id: 4,
      name: "Avocado",
      price: 1.2,
      quantity: 6,
      thumbnail: require("./assets/avocado.jpg"),
    },
    {
      id: 5,
      name: "Cabbage",
      price: 0.5,
      quantity: 8,
      thumbnail: require("./assets/cabbage2.jpg"),
    },
    {
      id: 6,
      name: "Eggplant",
      price: 0.7,
      quantity: 12,
      thumbnail: require("./assets/eggplant.jpg"),
    },
    {
      id: 7,
      name: "Mango",
      price: 1.3,
      quantity: 11,
      thumbnail: require("./assets/mango.jpg"),
    },
    {
      id: 8,
      name: "Peach",
      price: 0.3,
      quantity: 3,
      thumbnail: require("./assets/peach.jpg"),
    },
  ]);

  const [shoppingList, setShoppingList] = useState([]);

  const clearShoppingCart = () => {
    setShoppingList([]);
  };

  const addToShoppingCart = (itemId) => {
    const item = groceries.find((i) => i.id === itemId);

    if ( item.quantity <= 0) {
      return;
    }

    setGroceries((prevGroceries) =>
      prevGroceries.map((grocery) =>
        grocery.id === itemId
          ? { ...grocery, quantity: grocery.quantity - 1 }
          : grocery
      )
    );

    const shoppingCartItem = shoppingList.find((i) => i.id === itemId);

    if (shoppingCartItem) {
      setShoppingList((prevShoppingList) =>
        prevShoppingList.map((shoppingCartItem) =>
          shoppingCartItem.id === itemId
            ? { ...shoppingCartItem, quantity: shoppingCartItem.quantity + 1 }
            : shoppingCartItem
        )
      );
    } else {
      setShoppingList((prevShoppingList) => [
        ...prevShoppingList,
        { ...item, quantity: 1 },
      ]);
    }
  };

  const removeFromShoppingCart = (itemId) => {
    const removedItem = shoppingList.find((item) => item.id === itemId);

    setShoppingList((prevShoppingList) =>
      prevShoppingList.filter((item) => item.id !== itemId)
    );

    setGroceries((prevGroceries) =>
      prevGroceries.map((grocery) =>
        grocery.id === itemId
          ? { ...grocery, quantity: grocery.quantity + removedItem.quantity }
          : grocery
      )
    );
  };

  const incrementItem = (itemId) => {
    const item = shoppingList.find((i) => i.id === itemId);
    const groceryItem = groceries.find((i) => i.id === itemId);

    if (!item || !groceryItem || groceryItem.quantity <= 0) {
      return;
    }

    setShoppingList((prevShoppingList) =>
      prevShoppingList.map((shoppingCartItem) =>
        shoppingCartItem.id === itemId
          ? { ...shoppingCartItem, quantity: shoppingCartItem.quantity + 1 }
          : shoppingCartItem
      )
    );

    setGroceries((prevGroceries) =>
      prevGroceries.map((grocery) =>
        grocery.id === itemId
          ? { ...grocery, quantity: grocery.quantity - 1 }
          : grocery
      )
    );
  };

  const decrementItem = (itemId) => {
    const shoppingItem = shoppingList.find((i) => i.id === itemId);

    if (!shoppingItem || shoppingItem.quantity <= 1) {
      removeFromShoppingCart(itemId);
      return;
    }

    setShoppingList((prevShoppingList) =>
      prevShoppingList.map((shoppingCartItem) =>
        shoppingCartItem.id === itemId
          ? { ...shoppingCartItem, quantity: shoppingCartItem.quantity - 1 }
          : shoppingCartItem
      )
    );

    setGroceries((prevGroceries) =>
      prevGroceries.map((grocery) =>
        grocery.id === itemId
          ? { ...grocery, quantity: grocery.quantity + 1 }
          : grocery
      )
    );
  };

  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2>Groceries</h2>
            <Groceries
              groceries={groceries}
              addToShoppingCart={addToShoppingCart}
            />
          </div>
          <div className="col-md-6">
            <h2>Shopping Cart</h2>
            <ShoppingCart
              shoppingList={shoppingList}
              removeFromShoppingCart={removeFromShoppingCart}
              incrementItem={incrementItem}
              decrementItem={decrementItem}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
