import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import { isValidEmail, isValidPassword, isValidName } from '../utils/validations';
import { LOCAL_STORAGE_KEY, setItem } from '../services/localStorage';
import request from '../services/request';
import {
  PageContainer, Warning, Input, Button, Title, Form,
} from '../components';

function Register() {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (
      isValidPassword(password)
      && isValidPassword(confirmationPassword)
      && isValidEmail(email)
      && isValidName(name)
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password, name, confirmationPassword]);

  const register = async () => {
    const { error, data } = await request({
      method: 'post',
      url: '/users',
      data: { email, password, name },
    });

    if (error) {
      setErrorMessage(data.message);
      setConfirmationPassword('');
      setPassword('');
    } else {
      const { token, user } = data;
      setItem(LOCAL_STORAGE_KEY, { token });
      setUserData(user);
      navigate('/tasks');
    }
  };

  const handleClick = async () => {
    if (password === confirmationPassword) {
      await register();
    } else {
      setErrorMessage('You entered different passwords. Try again!');
      setConfirmationPassword('');
      setPassword('');
    }
  };

  return (
    <PageContainer>
      <Title>Join us!</Title>
      <Form>
        <Input
          required
          placeholder="Name"
          type="text"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <Input
          required
          placeholder="Email"
          value={email}
          type="email"
          onChange={({ target }) => setEmail(target.value)}
        />
        <Input
          required
          placeholder="Password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Input
          required
          placeholder="Confirm your password"
          type="password"
          value={confirmationPassword}
          onChange={({ target }) => setConfirmationPassword(target.value)}
        />
        {errorMessage && <Warning>{errorMessage}</Warning>}
        <Button
          type="button"
          disabled={isButtonDisabled}
          onClick={handleClick}
        >
          Register
        </Button>
      </Form>
    </PageContainer>
  );
}

export default Register;
