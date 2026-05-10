import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import data from '../data.js';

function Cart() {

  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {

    const saved =
      localStorage.getItem('cart');

    return saved
      ? JSON.parse(saved)
      : [];
  });

  const [warning, setWarning] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );

  }, [cart]);

  const showWarning = (text) => {

    setWarning(text);

    setTimeout(() => {
      setWarning('');
    }, 3000);
  };

  const showSuccess = (text) => {

    setSuccessMessage(text);

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const isSubscription = (item) =>
    item.id <= 4;

  const addToCart = (item) => {

    if (isSubscription(item)) {

      const hasSubscription = cart.some(
        i => i.id <= 4
      );

      if (hasSubscription) {

        showWarning(
          'Only one subscription allowed.'
        );

        return;
      }
    }

    const exists = cart.find(
      i => i.id === item.id
    );

    if (exists && !isSubscription(item)) {

      setCart(
        cart.map(i =>
          i.id === item.id
            ? {
                ...i,
                amount: i.amount + 1
              }
            : i
        )
      );

      showSuccess(
        `${item.service} quantity updated.`
      );

    }

    else if (!exists) {

      setCart([
        ...cart,
        {
          ...item,
          amount: 1
        }
      ]);

      showSuccess(
        `${item.service} added to cart.`
      );
    }
  };

  const removeItem = (id) => {

    setCart(
      cart.filter(item =>
        item.id !== id
      )
    );

    showWarning('Item removed from cart.');
  };

  const changeQuantity = (id, amount) => {

    setCart(
      cart.map(item =>
        item.id === id
          ? {
              ...item,
              amount: Math.max(1, amount)
            }
          : item
      )
    );
  };

  const clearCart = () => {

    setCart([]);

    showWarning('Cart cleared.');
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.amount,
    0
  );

  const handleCheckout = () => {

    navigate('/checkout');
  };

  return (

    <div className="page">

      <div className="cart-layout">

        {/* PRODUCTS */}

        <section className="cart-products">

          <h2>
            Subscriptions & Products
          </h2>

          {warning && (

            <p className="warning-message">
              {warning}
            </p>

          )}

          {successMessage && (

            <p className="success-message">
              {successMessage}
            </p>

          )}

          <div className="product-grid">

            {data.map(item => {

              const subscriptionLocked =

                isSubscription(item) &&

                cart.some(
                  i =>
                    i.id <= 4 &&
                    i.id !== item.id
                );

              return (

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
                    className={
                      subscriptionLocked
                        ? 'disabled-subscription-button'
                        : ''
                    }
                    disabled={subscriptionLocked}
                    onClick={() =>
                      addToCart(item)
                    }
                  >

                    {
                      subscriptionLocked
                        ? 'Subscription Selected'
                        : 'Add to Cart'
                    }

                  </button>

                </div>

              );
            })}

          </div>

        </section>

        {/* CART */}

        <aside className="cart-sidebar">

          <h2>Your Cart</h2>

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

                <button
                  className="checkout-button"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
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