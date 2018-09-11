import React, { Component } from 'react';
import BillSplitItem from './BillSplitItem.jsx';

class BillSplits extends Component {

  render() {
    console.log("Bill Splits Component");
    let billSplitItems;
    if (this.props.billsplititems) {
        billSplitItems = this.props.billsplititems.map(billsplititem => {
     //     console.log("item " + billsplititem);
          return (<BillSplitItem key={billsplititem.id} billsplititem={billsplititem} />);
       });
   }
    return (
      <div className="BillSplits">
        <h3>My Bill Splits</h3>
        <table>
        <tbody>
        <tr>
        <th>Event</th>
        <th>Debtor</th>
        <th>Creditor</th>
        <th>Amount</th>
        </tr>
        {billSplitItems}
        </tbody>
        </table>
      </div>
    );
}
}

export default BillSplits;
