import React, { Component } from 'react';


class DebtsSummary extends Component {
  render() {
    return (
      <div class="debtsummary">
      <table2>
      <tbody>
      <tr>
      <th>Friends Owe Me</th>
      </tr>
      <tr><td>$15 from 2 Events</td></tr>
      </tbody>
      </table2>

      <table2 align="right">
      <tbody>
      <tr>
      <th>I Owe</th>
      </tr>
      <tr><td>$25 from 3 Events</td></tr>
      </tbody>
      </table2>
      </div>
    );
  }
}

export default DebtsSummary;
