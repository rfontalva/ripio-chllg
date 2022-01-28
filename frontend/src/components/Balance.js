import React from 'react';
import { Container } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import AppContext from '../context/AppContext';

const Balance = () => {
  const { newDeposit } = React.useContext(AppContext);
  const { user } = React.useContext(UserContext);
  const [balance, setBalance] = React.useState({});

  const getBalance = async () => {
    try {
      const res = await fetch(`/api/balance?username=${user}`);
      setBalance(await res.json());
    } catch (e) {
      throw new Error(e);
    }
  };

  React.useEffect(() => {
    getBalance();
  }, [newDeposit]);

  return (
    <Container className="module-box" id="balance">
      <h3>
        Hola,
        {` ${user}`}
      </h3>
      <div>
        {Object.keys(balance).map((key) => (
          <>
            <h5>
              {key}
              :
            </h5>
            {key === 'BTC'
              ? <p>{balance[key]}</p>
              : <p>{`$${balance[key]}`}</p>}
          </>
        ))}
      </div>
    </Container>
  );
};

export default Balance;
