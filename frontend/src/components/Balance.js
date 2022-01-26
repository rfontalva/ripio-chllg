import React from 'react';
import UserContext from '../context/UserContext';

const Balance = () => {
  const [user] = React.useContext(UserContext);
  const [balance, setBalance] = React.useState({ btc: 0, ars: 0, usd: 0 });

  const getBalance = async () => {
    try {
      const res = await fetch(`/api/balance?username=${user}`);
      setBalance(res);
    } catch (e) {
      throw new Error(e);
    }
  };

  React.useEffect(() => {
    getBalance();
  }, []);

  return (
    <div>
      <h3>
        Hola,
        {user}
      </h3>
      <div>{balance}</div>
    </div>
  );
};

export default Balance;
