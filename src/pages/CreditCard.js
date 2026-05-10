import React, { useState, useEffect } from 'react';

function CreditCard() {

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');

  const [message, setMessage] = useState('');

  useEffect(() => {

    const savedCard =
      JSON.parse(localStorage.getItem('creditCard'));

    if (savedCard) {

      setCardName(savedCard.cardName || '');
      setCardNumber(savedCard.cardNumber || '');
      setExpiration(savedCard.expiration || '');
      setCvv(savedCard.cvv || '');

    }

  }, []);

  const formatCardNumber = (value) => {

    const numbers =
      value.replace(/\D/g, '');

    const groups =
      numbers.match(/.{1,4}/g);

    return groups
      ? groups.join(' ')
      : '';

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const savedCard = {

      cardName,
      cardNumber,
      expiration,
      cvv

    };

    localStorage.setItem(
      'creditCard',
      JSON.stringify(savedCard)
    );

    setMessage(
      'Credit card saved successfully.'
    );

    setTimeout(() => {

      setMessage('');

    }, 3000);

  };

  return (

    <div className="page">

      <section className="hero-banner">

        <div className="film-strip">
          ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮
        </div>

        <h2>Checkout</h2>

        <p>
          Enter and save your payment information.
        </p>

      </section>

      <form
        className="stream-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          placeholder="Name on Card"
          value={cardName}
          onChange={(e) =>
            setCardName(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          maxLength="19"
          value={cardNumber}
          onChange={(e) =>
            setCardNumber(
              formatCardNumber(e.target.value)
            )
          }
          required
        />

        <input
          type="text"
          placeholder="MM/YY"
          maxLength="5"
          value={expiration}
          onChange={(e) =>
            setExpiration(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="CVV"
          maxLength="4"
          value={cvv}
          onChange={(e) =>
            setCvv(e.target.value)
          }
          required
        />

        <button type="submit">
          Save Credit Card
        </button>

      </form>

      {message && (

        <div className="success-message">
          {message}
        </div>

      )}

    </div>
  );
}

export default CreditCard;