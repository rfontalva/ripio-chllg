import React from 'react';
import PropTypes from 'prop-types';

const Transaction = ({
  balance, id, seller_currency, buyer_currency, seller_price, buyer_price,
}) => {
  const [capitalizedCurrency, setCapitalized] = React.useState();

  React.useEffect(() => {
    const cap = buyer_currency.toUpperCase();
    setCapitalized(cap);
  }, []);

  console.log(balance[capitalizedCurrency], balance[capitalizedCurrency] < buyer_price);
  return (
    <div className="module-box" key={id}>
      <p>
        Ofrece
        {seller_price}
        {' '}
        {seller_currency}
      </p>
      <i
        className="fa fa-exchange"
      />
      <p>
        Entregas
        {buyer_price}
        {' '}
        {buyer_currency}
      </p>
      {
        balance[capitalizedCurrency] > buyer_price
          ? <button type="button">Comprar</button>
          : <button type="button" disabled>Fondos insuficientes</button>
      }
    </div>
  );
};

Transaction.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  balance: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  seller_currency: PropTypes.string.isRequired,
  buyer_currency: PropTypes.string.isRequired,
  seller_price: PropTypes.number.isRequired,
  buyer_price: PropTypes.number.isRequired,
};

export default Transaction;
