import React from 'react';

const getRows = props => {
  const result = [];
  const data = props.tableState.data;

  data[1].forEach(rawKey => {
    const rowItem = data[0][rawKey];
    result.push(
      <tr key={rawKey}>
        {props.columns.map((column, index) => {
          const colItem = rowItem[0][column.dataIndex];
          return (
            <td className="tableCell" key={column.dataIndex}>
              <div>
                {colItem}
                {index === 0 &&
                  props.hideColumns.length > 0 &&
                  <span className="button" onClick={() => props.toggleMoreDetails(rawKey)}>
                    more details
                  </span>}
              </div>
            </td>
          );
        })}
      </tr>
    );

    if (props.hideColumns.length > 0 && rowItem[0].expand) {
      props.hideColumns.forEach(column => {
        const hideColumItem = rowItem[0][column.dataIndex];
        result.push(
          <tr key={column.dataIndex}>
            <td>
              {column.title}
            </td>
            <td>
              {hideColumItem}
            </td>
          </tr>
        );
      });
    }
  });

  return result;
};

export default props =>
  <tbody>
    {getRows(props)}
  </tbody>;
