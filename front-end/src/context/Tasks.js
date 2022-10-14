import React, { useMemo, useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const saveNewTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const saveAllTasks = (allTasks) => {
    setTasks(allTasks);
  };

  const removeTask = (id) => {
    const currentTasks = tasks.filter((task) => task.id !== id);
    setTasks(currentTasks);
  };

  const editTask = (id, name, status) => {
    const foundTask = tasks.find((task) => task.id === id);

    if (foundTask) {
      foundTask.name = name;
      foundTask.status = status;
    }
  };

  const saveErrorMessage = (message) => {
    setErrorMessage(message);
  };

  const contextValue = useMemo(() => ({
    tasks,
    saveAllTasks,
    saveNewTask,
    removeTask,
    editTask,
    isEditing,
    setIsEditing,
    editingTask,
    setEditingTask,
    errorMessage,
    saveErrorMessage,
  }), [tasks, isEditing, editingTask, errorMessage]);

  return (
    <TasksContext.Provider value={contextValue}>
      { children }
    </TasksContext.Provider>
  );
}

TasksProvider.propTypes = {
  children: PropTypes.instanceOf('Object'),
}.isRequired;
