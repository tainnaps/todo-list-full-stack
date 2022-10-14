import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, Title, Warning } from '../styled';
import TasksTable from '../components/TasksTable';
import { LOCAL_STORAGE_KEY, getItem, removeItem } from '../services/localStorage';
import request from '../services/request';
import { TasksContext } from '../context/Tasks';

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

  return (
    <PageContainer>
      <Title>{ `Hello, ${getItem(LOCAL_STORAGE_KEY).username}! Welcome to your todo list.` }</Title>
      { errorMessage && <Warning>{ errorMessage }</Warning> }
      { tasks.length && <TasksTable /> }
    </PageContainer>
  );
}

export default Tasks;
