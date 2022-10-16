import React from 'react';
import TableBody from './TableBody';
import TableHead from './TableHead';
import { StyledTable } from '../styled';

function TasksTable() {
  const tableHeaders = ['#', 'Name', 'Status', 'Created At', 'Edit', 'Delete'];

  return (
    <StyledTable>
      <TableHead headers={tableHeaders} />
      <TableBody />
    </StyledTable>
  );
}

export default TasksTable;
