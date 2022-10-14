import React, { useContext } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { TasksContext } from '../context/Tasks';
import { getItem, LOCAL_STORAGE_KEY } from '../services/localStorage';
import request from '../services/request';
import { TableButton } from '../styled';

function TableBody() {
  const {
    tasks,
    removeTask,
    saveErrorMessage,
    setIsEditing,
    setEditingTask,
  } = useContext(TasksContext);

  const deleteTask = async (id) => {
    const { token } = getItem(LOCAL_STORAGE_KEY);
    const { error, data } = await request({
      method: 'delete',
      url: `/tasks/${id}`,
      headers: { Authorization: token },
    });

    if (error) {
      saveErrorMessage(data.message);
    } else {
      removeTask(id);
    }
  };

  const startEditingTask = async (task) => {
    setIsEditing(true);
    setEditingTask(task);
  };

  return (
    <tbody>
      { tasks.map((task, index) => (
        <tr key={task.id}>
          <td>
            { index + 1 }
          </td>
          <td>
            { task.name }
          </td>
          <td>
            { task.status }
          </td>
          <td>
            { task.createdAt.slice(0, 10) }
          </td>
          <td>
            <TableButton
              type="button"
              onClick={() => startEditingTask(task)}
            >
              <MdEdit />
            </TableButton>
          </td>
          <td>
            <TableButton
              type="button"
              onClick={() => deleteTask(task.id)}
            >
              <FaTrash />
            </TableButton>
          </td>
        </tr>
      )) }
    </tbody>
  );
}

export default TableBody;
