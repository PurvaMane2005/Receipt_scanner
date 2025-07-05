import React from 'react';

const categoryColors = {
  food: '#4caf50',
  grocery: '#ff9800',
  travel: '#2196f3',
  electronics: '#9c27b0',
  clothing: '#e91e63',
  other: '#607d8b',
  uncategorized: '#9e9e9e',
};

export default function ResultCard({ items }) {
  const total = items.reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>📊 Result</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Item</th>
            <th style={styles.th}>Amount (₹)</th>
            <th style={styles.th}>Category</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td style={styles.td}>{item.item}</td>
              <td style={styles.td}>₹{item.amount?.toFixed(2)}</td>
              <td style={styles.td}>
                <span style={{
                  ...styles.badge,
                  backgroundColor: categoryColors[item.category] || 'green'
                }}>
                  {item.category}
                </span>
              </td>
            </tr>
          ))}
          <tr>
            <td style={styles.total}>Total</td>
            <td style={styles.total}>₹{total.toFixed(2)}</td>
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  card: {
    marginTop: '30px',
    background: '#fff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: 'inherit',
  },
  th: {
    backgroundColor: '#f0f0f0',
    textAlign: 'left',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #eee',
  },
  total: {
    padding: '10px',
    fontWeight: 'bold',
    borderTop: '2px solid #ccc',
  },
  badge: {
    padding: '4px 10px',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '0.8rem',
    textTransform: 'capitalize',
  },
};
