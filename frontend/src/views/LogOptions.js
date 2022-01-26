import React from 'react';
import SignUp from '../components/SignUp';
import Login from '../components/Login';

const LogOptions = () => {
  const [showLogin, setShowLogin] = React.useState();

  return (
    <div>
      {showLogin
        ? <Login show={showLogin} setShow={setShowLogin} />
        : <SignUp />}
    </div>
  );
};

export default LogOptions;
