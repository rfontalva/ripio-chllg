import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import userUtils from '../hooks/userUtils';
import AppContext from '../context/AppContext';

const SignUp = () => {
  const { setUser } = React.useContext(UserContext);
  const { setIsLoggedIn } = React.useContext(AppContext);

  const [account, setAccount] = useState({
    firstname: '',
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [wrongPassword, setWrongPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    firstname: false,
    username: false,
    email: false,
    password: false,
    emailExists: false,
    usernameExists: false,
  });

  const validate = () => {
    let isValid = true;
    let firstname = false;
    let username = false;
    let email = false;
    let password = false;
    if (account.firstname === '') {
      isValid = false;
      firstname = true;
    }
    if (account.username === '') {
      isValid = false;
      username = true;
    }
    if (account.email === '') {
      isValid = false;
      email = true;
    }
    if (account.password === '') {
      isValid = false;
      password = true;
    }
    setErrorMessages({
      ...errorMessages,
      firstname,
      username,
      email,
      password,
    });
    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const {
      firstname, username, email, password, password2,
    } = account;
    if (password !== password2) {
      setWrongPassword(true);
      return;
    }
    if (!validate()) return;
    try {
      const res = await fetch(
        `/api/user?firstname=${firstname}&email=${email}&username=${username}&password=${password}`,
        { method: 'PUT' },
      );
      switch (res.status) {
        case 403:
          setErrorMessages(await res.json());
          break;
        case 200:
          // eslint-disable-next-line
          const { user } = await res.json();
          setUser(user);
          userUtils.cookieLogIn(user);
          setIsLoggedIn(true);
          break;
        default:
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const changeHandler = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    if ((name === 'password' || name === 'password2') && wrongPassword) {
      setWrongPassword(false);
    }
    if (name === 'email' && errorMessages.emailExists) {
      setErrorMessages({
        ...errorMessages, emailExists: false, email: false,
      });
    } else if (name === 'username' && errorMessages[name]) {
      setErrorMessages({
        ...errorMessages, usernameExists: false, username: false,
      });
    } else if (errorMessages[name]) {
      setErrorMessages({
        ...errorMessages, [name]: false,
      });
    }
    setAccount({ ...account, [name]: value });
  };

  return (
    <div className="center">
      <Form className="module-box" onSubmit={submitHandler}>
        <Col>
          <h1>Registrate</h1>
          <Form.Label htmlFor="firstname">
            Nombre
            <Form.Control className="input" type="text" id="firstname" name="firstname" onChange={changeHandler} value={account.firstname} />
          </Form.Label>
          {errorMessages.firstname && <p className="error-text">El campo Nombre no puede quedar vacío</p>}
          <Form.Label htmlFor="username">
            Nombre de usuario
            <Form.Control className="input" type="text" id="username" name="username" onChange={changeHandler} value={account.username} />
          </Form.Label>
          {errorMessages.usernameExists && <p className="error-text">{errorMessages.usernameExists}</p>}
          {errorMessages.username && <p className="error-text">El campo Nombre de usuario no puede quedar vacío</p>}
          <Form.Label htmlFor="email">
            Email
            <Form.Control className="input" type="email" id="email" name="email" onChange={changeHandler} value={account.email} />
          </Form.Label>
          {errorMessages.emailExists && <p className="error-text">{errorMessages.emailExists}</p>}
          {errorMessages.email && <p className="error-text">El campo Email no puede quedar vacío</p>}
          <Form.Label htmlFor="password">
            Contraseña
            <Form.Control className="input" type="password" id="password" name="password" onChange={changeHandler} value={account.password} />
          </Form.Label>
          {errorMessages.password && <p className="error-text">El campo Contraseña no puede quedar vacío</p>}
          <Form.Label htmlFor="password2">
            Repita su contraseña
            <Form.Control className="input" type="password" id="password2" name="password2" onChange={changeHandler} value={account.password2} />
          </Form.Label>
          {wrongPassword && <p className="error-text">Las contraseñas no coinciden</p>}
          <Button type="submit" onClick={submitHandler}>Enviar</Button>
        </Col>
      </Form>
    </div>
  );
};

export default SignUp;
