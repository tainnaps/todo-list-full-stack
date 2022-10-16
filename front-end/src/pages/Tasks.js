import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, Text, Container } from '../styled';
import { LOCAL_STORAGE_KEY, getItem, removeItem } from '../services/localStorage';
import request from '../services/request';
import { TasksContext } from '../context/Tasks';
import { Header, TasksControl, TasksTable } from '../components';

function Tasks() {
  const navigate = useNavigate();
  const {
    tasks,
    saveAllTasks,
    errorMessage,
  } = useContext(TasksContext);

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
      saveAllTasks(data);
    }
  };

  useEffect(() => {
    const authenticateUser = async () => {
      const { token } = getItem(LOCAL_STORAGE_KEY);

      if (!token) {
        navigate('/');
      } else {
        await getAllTasks(token);
      }
    };

    authenticateUser();
  }, []);

  const logout = () => {
    removeItem(LOCAL_STORAGE_KEY);
    navigate('/');
  };

  return (
    <PageContainer
      justify="flex-start"
      align="center"
      gap="10"
    >
      <Header handleLogoutClick={logout} />
      <Container
        large
        justify="center"
        align="center"
        gap="4"
      >
        <TasksControl />
        { errorMessage && <Text warning>{ errorMessage }</Text> }
      </Container>
      { tasks.length && <TasksTable /> }
    </PageContainer>
  );
}

export default Tasks;
