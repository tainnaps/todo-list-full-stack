import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Link from '../components/Link';
import Warning from '../components/Warning';
import Input from '../components/Input';
import Button from '../components/Button';
import Title from '../components/Title';
import Form from '../components/Form';
import request from '../services/request';
import isValidEmail from '../utils/isValidEmail';
import isValidPassword from '../utils/isValidPassword';
import { LOCAL_STORAGE_KEY, setItem } from '../services/localStorage';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const [loginResponse, setLoginResponse] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (isValidPassword(password) && isValidEmail(email)) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  const handleClick = async () => {
    const { error, data } = await request({
      method: 'post',
      url: '/users/login',
      data: { email, password },
    });

    if (error) {
      setErrorMessage(data.message);
      setPassword('');
    } else {
      const { token } = data;
      setItem(LOCAL_STORAGE_KEY, { token });
      // setLoginResponse(data);
      navigate('/tasks');
    }
  };

  return (
    <PageContainer>
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
        {errorMessage && <Warning>{errorMessage}</Warning>}
        <Button
          type="button"
          disabled={isButtonDisabled}
          onClick={handleClick}
        >
          Login
        </Button>
      </Form>
      <Link to="/register">Register here!</Link>
    </PageContainer>
  );
}

export default Login;
