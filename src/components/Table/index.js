import React from 'react';
import Body from './body';
import Head from './head';

export default props =>
  <div>
    <table className="table">
      <Head {...props} />
      <Body {...props} />
      <tfoot className="tableFooter">
        <tr>
          <th>Total</th>
        </tr>
      </tfoot>
    </table>
  </div>;
