import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidEmail, isValidPassword } from '../utils/validations';
import { LOCAL_STORAGE_KEY, setItem, getItem } from '../services/localStorage';
import request from '../services/request';
import {
  PageContainer, Link, Text, Input, Button, Title, Form,
} from '../styled';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      const { token } = getItem(LOCAL_STORAGE_KEY);

      if (token) {
        navigate('/tasks');
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    if (isValidPassword(password) && isValidEmail(email)) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  const login = async () => {
    const { error, data } = await request({
      method: 'post',
      url: '/users/login',
      data: { email, password },
    });

    if (error) {
      setErrorMessage(data.message);
      setPassword('');
    } else {
      const { token, user } = data;
      setItem(LOCAL_STORAGE_KEY, { token, username: user.name });
      navigate('/tasks');
    }
  };

  return (
    <PageContainer
      justify="center"
      align="center"
      gap="3"
    >
      <Title>Todo List</Title>
      <Form>
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
        {errorMessage && <Text warning>{errorMessage}</Text>}
        <Button
          type="button"
          disabled={isButtonDisabled}
          onClick={login}
        >
          Login
        </Button>
      </Form>
      <Link to="/register">Register here!</Link>
    </PageContainer>
  );
}

export default Login;
