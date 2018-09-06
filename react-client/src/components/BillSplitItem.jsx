import React, { Component } from 'react';


class BillSplitItem extends Component {
  render() {
    return (
      <tr className="BillSplitItem">
        <td>{this.props.billsplititem.event}</td><td>{this.props.billsplititem.debtor}</td><td>{this.props.billsplititem.creditor}</td><td>{this.props.billsplititem.amount}</td>
      </tr>
    );
  }
}

export default BillSplitItem;
