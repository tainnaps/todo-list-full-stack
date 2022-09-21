import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, Title } from '../components';
import { LOCAL_STORAGE_KEY, getItem, removeItem } from '../services/localStorage';
import request from '../services/request';

function Tasks() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [tasks, setTasks] = useState([]);

  const getAllTasks = async (token) => {
    const { error, data } = await request({
      method: 'get',
      url: '/tasks',
      headers: { Authorization: token },
    });

    if (error && data.message === 'Unauthorized') {
      removeItem(LOCAL_STORAGE_KEY);
      navigate('/');
    } else {
      setTasks(data);
    }
  };

  useEffect(() => {
    const authenticate = async () => {
      const { token } = getItem(LOCAL_STORAGE_KEY);

      if (!token) {
        navigate('/');
      } else {
        await getAllTasks(token);
      }
    };

    authenticate();
  }, []);

  return (
    <PageContainer>
      <Title>Tasks</Title>
    </PageContainer>
  );
}

export default Tasks;
