import React, { useState, useEffect } from 'react';

import data from '../data.js';

function Cart() {

  const [cart, setCart] = useState(() => {

    const saved = localStorage.getItem('cart');

    return saved
      ? JSON.parse(saved)
      : [];

  });

  const [warning, setWarning] = useState('');

  useEffect(() => {

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );

  }, [cart]);

  const isSubscription = (item) => {
    return item.id <= 4;
  };

  const showWarning = (text) => {

    setWarning(text);

    setTimeout(() => {
      setWarning('');
    }, 3000);

  };

  const addToCart = (item) => {

    if (isSubscription(item)) {

      const hasSubscription = cart.some(
        cartItem => cartItem.id <= 4
      );

      if (hasSubscription) {

        showWarning(
          "Only one subscription plan can be added."
        );

        return;
      }
    }

    const existingItem = cart.find(
      cartItem => cartItem.id === item.id
    );

    if (existingItem && !isSubscription(item)) {

      const updatedCart = cart.map(cartItem =>

        cartItem.id === item.id
          ? {
              ...cartItem,
              amount: cartItem.amount + 1
            }
          : cartItem

      );

      setCart(updatedCart);

    } else if (!existingItem) {

      setCart([
        ...cart,
        {
          ...item,
          amount: 1
        }
      ]);
    }

    setWarning('');
  };

  const removeItem = (id) => {

    const updatedCart = cart.filter(
      item => item.id !== id
    );

    setCart(updatedCart);
  };

  const changeQuantity = (id, amount) => {

    const updatedCart = cart.map(item =>

      item.id === id
        ? {
            ...item,
            amount: Math.max(1, amount)
          }
        : item

    );

    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce(

    (sum, item) => {
      return sum + (item.price * item.amount);
    },

    0

  );

  return (

    <div className="page">

      <div className="cart-layout">

        {/* LEFT SIDE */}

        <section className="cart-products">

          <h2>
            Subscriptions & Products
          </h2>

          {warning && (

            <p className="warning-message">
              {warning}
            </p>

          )}

          <div className="product-grid">

            {data.map(item => (

              <div
                key={item.id}
                className="product-card"
              >

                <img
                  src={item.img}
                  alt={item.service}
                />

                <h3>
                  {item.service}
                </h3>

                <p>
                  {item.serviceInfo}
                </p>

                <strong>
                  ${item.price}
                </strong>

                <button
                  onClick={() =>
                    addToCart(item)
                  }
                >
                  Add to Cart
                </button>

              </div>

            ))}

          </div>

        </section>

        {/* RIGHT SIDE */}

        <aside className="cart-sidebar">

          <h2>
            Your Cart
          </h2>

          {cart.length === 0 ? (

            <p className="empty-state">
              Cart is empty.
            </p>

          ) : (

            <>

              <div className="cart-items">

                {cart.map(item => (

                  <div
                    key={item.id}
                    className="cart-item"
                  >

                    <h4>
                      {item.service}
                    </h4>

                    <p>
                      ${item.price}
                    </p>

                    <div className="quantity-controls">

                      <button
                        onClick={() =>
                          changeQuantity(
                            item.id,
                            item.amount - 1
                          )
                        }
                      >
                        -
                      </button>

                      <span>
                        {item.amount}
                      </span>

                      <button
                        onClick={() =>
                          changeQuantity(
                            item.id,
                            item.amount + 1
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                    <button
                      className="remove-button"
                      onClick={() =>
                        removeItem(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                ))}

              </div>

              <div className="cart-total">

                <h3>
                  Total:
                  ${total.toFixed(2)}
                </h3>

                <button
                  className="clear-cart-button"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>

              </div>

            </>

          )}

        </aside>

      </div>

    </div>
  );
}

export default Cart;