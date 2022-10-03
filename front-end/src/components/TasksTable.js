import React from 'react';
import PropTypes from 'prop-types';
import TableBody from './TableBody';
import TableHead from './TableHead';
import { StyledTable } from '../styled';

function TasksTable({ tasks }) {
  const tableHeaders = ['#', 'Task Name', 'Status', 'Created At', 'Edit', 'Delete'];

  return (
    <StyledTable>
      <TableHead headers={tableHeaders} />
      <TableBody tasks={tasks} />
    </StyledTable>
  );
}

TasksTable.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.instanceOf('Object')),
}.isRequired;

export default TasksTable;
