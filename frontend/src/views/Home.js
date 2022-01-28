import React from 'react';
// import { Col } from 'react-bootstrap';
import Balance from '../components/Balance';
import Deposit from '../components/Deposit';
import TransactionHub from '../components/TransactionHub';

const Home = () => (
  <div id="home">
    <Balance />
    <Deposit />
    <TransactionHub />
  </div>
);

export default Home;
