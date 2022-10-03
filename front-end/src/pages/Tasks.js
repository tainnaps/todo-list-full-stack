import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, Title } from '../styled';
import TasksTable from '../components/TasksTable';
import { LOCAL_STORAGE_KEY, getItem, removeItem } from '../services/localStorage';
import request from '../services/request';

function Tasks() {
  const navigate = useNavigate();
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
      <Title>{`Hello, ${getItem(LOCAL_STORAGE_KEY).username}! Welcome to your todo list.`}</Title>
      {tasks.length && <TasksTable tasks={tasks} />}
    </PageContainer>
  );
}

export default Tasks;
