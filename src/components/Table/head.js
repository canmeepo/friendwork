import React from 'react';

export default props =>
  <thead>
    <tr>
      {props.columns.map(column =>
        <th
          onClick={() => props.sortData(column.dataIndex)}
          key={column.dataIndex}
          className="headerNav"
        >
          {column.title}
        </th>
      )}
    </tr>
  </thead>;
