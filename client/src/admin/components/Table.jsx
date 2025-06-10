import React from 'react';

const Table = ({ columns, data, renderRow, className = '' }) => {
  return (
    <table className={`admin-table ${className}`}>
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={col.accessor || idx}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => renderRow(row, idx))}
      </tbody>
    </table>
  );
};

export default Table; 