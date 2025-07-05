import React from 'react';

export default function ParsedTable({ items }) {
  const total = items.reduce((acc, item) => acc + (isNaN(item.amount) ? 0 : item.amount), 0);

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Parsed Items:</h3>
      <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Amount (₹)</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i, idx) => (
            <tr key={idx}>
              <td>{i.item}</td>
              <td>{isNaN(i.amount) ? '—' : i.amount.toFixed(2)}</td>
              <td>{i.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginTop: '10px' }}><strong>Total:</strong> ₹{total.toFixed(2)}</p>
    </div>
  );
}
