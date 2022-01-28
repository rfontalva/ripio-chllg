import React from 'react';
import { Container } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import AppContext from '../context/AppContext';
import Transaction from './Transaction';

const TransactionHub = () => {
  const { user } = React.useContext(UserContext);
  const [transactions, setTransactions] = React.useState([]);
  const [balance, setBalance] = React.useState({});
  const { newDeposit } = React.useContext(AppContext);

  const getBalance = async () => {
    try {
      const res = await fetch(`/api/balance?username=${user}`);
      setBalance(await res.json());
    } catch (e) {
      throw new Error(e);
    }
  };

  const getTransactions = async () => {
    const res = await fetch('/api/transactions');
    const { incompleteTransactions } = await res.json();
    setTransactions(incompleteTransactions);
  };

  React.useEffect(() => {
    getTransactions();
    getBalance();
  }, [newDeposit]);

  return (
    <Container className="module-box" id="transaction-hub">
      <h2>Ofertas disponibles</h2>
      <Container id="transaction-container">
        {transactions.map((transaction) => (
          <Transaction
            balance={balance}
            id={transaction.id}
            seller_currency={transaction.seller_currency}
            buyer_currency={transaction.buyer_currency}
            seller_price={transaction.seller_price}
            buyer_price={transaction.buyer_price}
          />
        ))}
      </Container>
    </Container>
  );
};

export default TransactionHub;
