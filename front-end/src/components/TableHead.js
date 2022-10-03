import React from 'react';
import PropTypes from 'prop-types';

function TableHead({ headers }) {
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default TableHead;
