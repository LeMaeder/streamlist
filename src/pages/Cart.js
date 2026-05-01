import React, { useState, useEffect } from 'react';
import data from '../data.js';

function Cart() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [warning, setWarning] = useState('');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
  }, [cart]);

  const isSubscription = (item) => item.id <= 4;

  const addToCart = (item) => {
    if (isSubscription(item)) {
      const hasSubscription = cart.some(i => i.id <= 4);
      if (hasSubscription) {
        setWarning("Only one subscription allowed.");
        return;
      }
    }

    const exists = cart.find(i => i.id === item.id);

    if (exists && !isSubscription(item)) {
      setCart(cart.map(i =>
        i.id === item.id ? { ...i, amount: i.amount + 1 } : i
      ));
    } else if (!exists) {
      setCart([...cart, { ...item, amount: 1 }]);
    }

    setWarning('');
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const changeQuantity = (id, amount) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, amount: Math.max(1, amount) } : item
    ));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.amount, 0);

  return (
    <div className="page">
      <h2>Subscriptions & Products</h2>

      {warning && <p style={{ color: 'red' }}>{warning}</p>}

      {data.map(item => (
        <div key={item.id} className="movie-item">
          <h4>{item.service}</h4>
          <p>{item.serviceInfo}</p>
          <p>${item.price}</p>
          <button onClick={() => addToCart(item)}>Add</button>
        </div>
      ))}

      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map(item => (
        <div key={item.id} className="movie-item">
          <h4>{item.service}</h4>
          <p>${item.price}</p>

          <div className="movie-buttons">
            <button onClick={() => changeQuantity(item.id, item.amount - 1)}>-</button>
            <span>{item.amount}</span>
            <button onClick={() => changeQuantity(item.id, item.amount + 1)}>+</button>
          </div>

          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}

      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

export default Cart;