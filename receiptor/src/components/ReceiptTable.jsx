import React from 'react';

export default function ReceiptTable({ items }) {
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Parsed Items:</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Item</th>
            <th>Amount (₹)</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item.item}</td>
              <td>{item.amount}</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Total: ₹{total.toFixed(2)}</p>
    </div>
  );
}
