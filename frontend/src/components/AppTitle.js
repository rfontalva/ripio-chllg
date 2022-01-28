import React from 'react';
import { Button } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import userUtils from '../hooks/userUtils';

const AppTitle = () => {
  const { setUser } = React.useContext(UserContext);
  return (
    <div id="title">
      <h1>Mini billetera virtual</h1>
      <Button variant="outline-primary" style={{ marginTop: '-3rem' }} onClick={() => userUtils.logOut(setUser)}>Cerrar Sesión</Button>
    </div>
  );
};

export default AppTitle;
