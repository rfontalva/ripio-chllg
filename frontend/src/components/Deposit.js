import React from 'react';
import {
  Button, Container, Row, Col,
} from 'react-bootstrap';
import UserContext from '../context/UserContext';
import AppContext from '../context/AppContext';

const Deposit = () => {
  const [currencies, setCurrencies] = React.useState({});
  const [chosenCurrency, chooseCurrency] = React.useState('Elija su moneda');
  const [amount, setAmount] = React.useState(0);
  const { user } = React.useContext(UserContext);
  const { newDeposit, setNewDeposit } = React.useContext(AppContext);

  const getCurrencies = async () => {
    const res = await fetch('/api/currency');
    const curr = await res.json();
    console.log(curr);
    setCurrencies(curr);
  };

  const changeHandler = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    if (name === 'amount') {
      setAmount(value);
      return;
    }
    chooseCurrency(value);
    console.log(chosenCurrency);
  };

  const deposit = async () => {
    try {
      const res = await fetch(`/api/deposit?username=${user}&currency=${chosenCurrency}&amount=${amount}`);
      if (res.status === 200) {
        setNewDeposit(!newDeposit);
        setAmount(0);
        chooseCurrency('Elija su moneda');
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getCurrencies();
  }, []);
  return (
    <Container className="module-box" id="deposit">
      <h3>Haga un deposito</h3>
      <Row style={{ maxHeight: '50px' }}>
        <Col>
          <input
            className="input"
            id="deposit-inp"
            type="number"
            name="amount"
            value={amount}
            onChange={changeHandler}
          />
        </Col>
        <Col>
          <div className="dropdown">
            <Button
              variant="outline-primary s"
              type="button"
              className="login-navbar"
              id="user-button"
            >
              {chosenCurrency}
            </Button>
            <div className="dropdown-content">
              <ul style={{ listStyleType: 'none' }}>
                {Object.keys(currencies).map((key) => (
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                  <li
                    name={key}
                    defaultValue={key}
                    key={key}
                    onClick={() => chooseCurrency(key)}
                    onKeyDown={() => chooseCurrency(key)}
                  >
                    {`${key} (${currencies[key]})`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: '1rem' }}>
        <Button id="deposit-btn" variant="outline-primary s" onClick={deposit}>Depositar</Button>
      </Row>
    </Container>
  );
};

export default Deposit;
