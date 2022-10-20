import React, { useContext, useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { TasksContext } from '../context/Tasks';
import { getItem, LOCAL_STORAGE_KEY } from '../services/localStorage';
import request from '../services/request';
import {
  Button, Container, Input, Select, Label,
} from '../styled';

function TasksControl() {
  const {
    saveNewTask,
    isEditing,
    editingTask,
    editTask,
    setIsEditing,
    setEditingTask,
    saveErrorMessage,
  } = useContext(TasksContext);
  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState('Pending');
  const possibleStatus = ['Pending', 'In progress', 'Done'];

  useEffect(() => {
    if (isEditing) {
      setTaskName(editingTask.name);
      setTaskStatus(editingTask.status);
    }
  }, [isEditing]);

  const createTask = async () => {
    const { token } = getItem(LOCAL_STORAGE_KEY);
    const { error, data } = await request({
      method: 'post',
      url: '/tasks',
      data: { name: taskName },
      headers: { Authorization: token },
    });

    if (error) {
      saveErrorMessage(data.message);
    } else {
      saveNewTask(data);
      setTaskName('');
    }
  };

  const finishEditingTask = async () => {
    const { token } = getItem(LOCAL_STORAGE_KEY);
    const { id } = editingTask;
    const { error, data } = await request({
      method: 'put',
      url: `/tasks/${id}`,
      data: { name: taskName, status: taskStatus },
      headers: { Authorization: token },
    });

    if (error) {
      saveErrorMessage(data.message);
    } else {
      editTask(id, taskName, taskStatus);
      setIsEditing(false);
      setEditingTask({});
      setTaskName('');
      setTaskStatus('Pending');
    }
  };

  return (
    <Container
      row
      large
      justify="center"
      align="center"
      gap="2"
    >
      <Label htmlFor="name">Name</Label>
      <Input
        required
        id="name"
        placeholder="Task name"
        autoComplete="off"
        type="text"
        value={taskName}
        onChange={({ target }) => setTaskName(target.value)}
        small
      />
      { isEditing && (
        <>
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            value={taskStatus}
            onChange={({ target }) => setTaskStatus(target.value)}
            small
          >
            { possibleStatus.map((status) => (
              <option
                key={status}
                value={status}
              >
                { status }
              </option>
            )) }
          </Select>
        </>
      ) }
      <Button
        type="button"
        onClick={isEditing ? finishEditingTask : createTask}
      >
        { isEditing ? <MdEdit /> : <FaPlus /> }
      </Button>
    </Container>
  );
}

export default TasksControl;
