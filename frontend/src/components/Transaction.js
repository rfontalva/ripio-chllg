import React from 'react';
import PropTypes from 'prop-types';

const Transaction = ({
  id, sellerCurrency, buyerCurrency, sellerPrice, buyerPrice,
}) => <div />;

Transaction.propTypes = {
  id: PropTypes.string.isRequired,
  sellerCurrency: PropTypes.string.isRequired,
  buyerCurrency: PropTypes.string.isRequired,
  sellerPrice: PropTypes.number.isRequired,
  buyerPrice: PropTypes.number.isRequired,
};

export default Transaction;
