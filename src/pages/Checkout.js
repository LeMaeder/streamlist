import React, { useState } from 'react';

function Checkout() {

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [message, setMessage] = useState('');

  const formatCardNumber = (value) => {

    const cleaned =
      value.replace(/\D/g, '');

    const match =
      cleaned.match(/.{1,4}/g);

    return match
      ? match.join(' ')
      : '';
  };

  const handleCardNumberChange = (e) => {

    const formatted =
      formatCardNumber(e.target.value);

    setCardNumber(formatted);
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const paymentData = {
      cardName,
      cardNumber,
      expiration,
      cvv
    };

    localStorage.setItem(
      'creditCard',
      JSON.stringify(paymentData)
    );

    setMessage(
      'Credit card saved successfully.'
    );

    setCardName('');
    setCardNumber('');
    setExpiration('');
    setCvv('');
  };

  return (

    <div className="page">

      <section className="hero-banner">

        <div className="film-strip">
          ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮
        </div>

        <h2>Secure Checkout</h2>

        <p>
          Enter your payment information securely.
        </p>

      </section>

      {message && (

        <div className="success-message">
          {message}
        </div>

      )}

      <form
        className="stream-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          placeholder="Cardholder Name"
          value={cardName}
          onChange={(e) =>
            setCardName(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={handleCardNumberChange}
          maxLength="19"
          required
        />

        <input
          type="text"
          placeholder="MM/YY"
          value={expiration}
          onChange={(e) =>
            setExpiration(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="CVV"
          value={cvv}
          onChange={(e) =>
            setCvv(e.target.value)
          }
          maxLength="4"
          required
        />

        <button type="submit">
          Save Credit Card
        </button>

      </form>

    </div>
  );
}

export default Checkout;