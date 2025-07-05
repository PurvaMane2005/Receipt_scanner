import React, { useState } from 'react';
import OCRUploader from './components/OCRUploader';
import ResultCard from './components/ResultCard';

export default function App() {
  const [items, setItems] = useState([]);

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.title}>🧾 Receptor</h1>
        <p style={styles.subtitle}>Smart Receipt Categorizer using AI</p>
      </header>

      <main style={styles.main}>
        <OCRUploader setItems={setItems} />
        {items.length > 0 && <ResultCard items={items} />}
      </main>

      <footer style={styles.footer}>
        Made with 🧠 for college competition ⚡
      </footer>
    </div>
  );
}

const styles = {
  app: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: '#ffffff',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  title: {
    margin: 0,
    fontSize: '2rem',
  },
  subtitle: {
    margin: '8px 0 0',
    color: '#666',
  },
  main: {
    flex: 1,
    padding: '30px 20px',
    maxWidth: '700px',
    margin: '0 auto',
  },
  footer: {
    fontSize: '0.8rem',
    color: '#999',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#fff',
    borderTop: '1px solid #eee',
  },
};
