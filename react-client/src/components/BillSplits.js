import React, { Component } from 'react';
import BillSplitItem from './BillSplitItem';

class BillSplits extends Component {

  render() {
    let billSplitItems;
    if (this.props.billsplititems) {
        billSplitItems = this.props.billsplititems.map(function(billsplititem) {
        console.log(billsplititem);
        return (<BillSplitItem key={billsplititem.eventid} billsplititem={billsplititem} />)
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
