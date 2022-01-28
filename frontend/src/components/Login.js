import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import AppContext from '../context/AppContext';
import userUtils from '../hooks/userUtils';

const Login = ({ setShow }) => {
  const { setUser } = React.useContext(UserContext);
  const { setIsLoggedIn } = React.useContext(AppContext);
  const [inputs, setInputs] = useState({});
  const [wrongUser, setWrongUser] = useState(false);

  const authenticate = async () => {
    setWrongUser(false);
    const { usernameInput, password } = inputs;
    const response = await fetch(
      `http://localhost:5000/api/validate?username=${usernameInput}&password=${password}`,
      { method: 'POST' },
    );
    console.log(response);
    if (response.status === 200) {
      const { username } = await response.json();
      setUser(username);
      setShow(false);
      userUtils.cookieLogIn(username);
      setIsLoggedIn(true);
      return;
    }
    setWrongUser(true);
  };

  const keyDownHandler = (e) => {
    if (e.keyCode === 13) authenticate();
  };

  const changeHandler = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <div className="center">
      <Form className="module-box">
        <Form.Group className="form-container sign-in-container">
          <h2>Iniciar sesión</h2>
          <Form.Control
            className="input"
            id="username"
            type="username"
            placeholder="Nombre de usuario"
            name="usernameInput"
            onKeyDown={keyDownHandler}
            onChange={changeHandler}
          />
          <Form.Control
            className="input"
            id="password"
            type="password"
            placeholder="Contraseña"
            name="password"
            onKeyDown={keyDownHandler}
            onChange={changeHandler}
          />
          {wrongUser && <p className="error-text">Usuario o contraseña incorrectos</p>}
          <Button type="button" className="sign-btn" onClick={authenticate}>Ingresar</Button>
          <p href="/">Aún no tienes una cuenta?</p>
          <Button type="button" className="sign-btn" onClick={() => setShow(false)}>Registrate</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

Login.propTypes = {
  setShow: PropTypes.func.isRequired,
};

export default Login;
