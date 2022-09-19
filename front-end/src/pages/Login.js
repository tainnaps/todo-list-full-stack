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

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [loginResponse, setLoginResponse] = useState({});
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
      setLoginResponse(data);
      navigate('/register');
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
        <Button
          type="button"
          disabled={isButtonDisabled}
          onClick={handleClick}
        >
          Login
        </Button>
      </Form>
      {errorMessage && (
        <Warning>{errorMessage}</Warning>
      )}
      <Link to="/register">Register here!</Link>
    </PageContainer>
  );
}

export default Login;
