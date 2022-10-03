import React from 'react';
import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { TableButton } from '../styled';

function TableBody({ tasks }) {
  return (
    <tbody>
      {tasks.map((task, index) => (
        <tr key={task.id}>
          <td>
            {index + 1}
          </td>
          <td>
            {task.name}
          </td>
          <td>
            {task.status}
          </td>
          <td>
            {task.createdAt.slice(0, 10)}
          </td>
          <td>
            <TableButton>
              <MdEdit />
            </TableButton>
          </td>
          <td>
            <TableButton>
              <FaTrash />
            </TableButton>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.instanceOf('Object')),
}.isRequired;

export default TableBody;
