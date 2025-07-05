import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { categorizeWithGemini } from '../lib/categorizeWithGemini';

export default function OCRUploader({ setItems }) {
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rawText, setRawText] = useState('');

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageURL(URL.createObjectURL(file));
    setLoading(true);

    try {
      const result = await Tesseract.recognize(file, 'eng');
      const text = result.data.text;
      setRawText(text);

      const lines = text.split('\n').map(line => line.trim());
      const totalLine = lines.find(line =>
        /total\s*(amount|price)?[:\-]?\s*\$?\d+/i.test(line)
      );

      let totalAmount = null;
      if (totalLine) {
        const match = totalLine.match(/(\d+(?:\.\d{2})?)/);
        if (match) totalAmount = parseFloat(match[1]);
      }

      if (!totalAmount) {
        alert("❌ Could not extract total amount.");
        setLoading(false);
        return;
      }

      const categorized = await categorizeWithGemini(text, totalAmount);
      setItems([categorized]);
    } catch (err) {
      console.error("OCR or Gemini error:", err);
      alert("❌ Error processing the receipt.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>
        <span style={styles.uploadText}>📤 Upload a receipt</span>
        <input type="file" onChange={handleImage} accept="image/*" style={styles.input} />
      </label>

      {imageURL && (
        <img src={imageURL} alt="Receipt Preview" style={styles.preview} />
      )}

      {loading && <p style={styles.loading}>⏳ Scanning your receipt...</p>}

      {rawText && (
        <details style={styles.details}>
          <summary style={styles.summary}>🧾 View Raw OCR</summary>
          <pre style={styles.raw}>{rawText}</pre>
        </details>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
  },
  label: {
    display: 'inline-block',
    background: '#0077ff',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  uploadText: {
    display: 'block',
  },
  input: {
    display: 'none',
  },
  preview: {
  display: 'block',
  margin: '20px auto',
  maxWidth: '400px',      // ✅ Limits the width
  width: '100%',          // ✅ Makes it responsive
  height: 'auto',         // ✅ Maintains aspect ratio
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  border: '1px solid #ddd',
}

,
  loading: {
    marginTop: '15px',
    color: '#555',
    fontStyle: 'italic',
  },
  details: {
    marginTop: '20px',
    background: '#f1f1f1',
    padding: '12px',
    borderRadius: '6px',
    textAlign: 'left',
  },
  summary: {
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  raw: {
    whiteSpace: 'pre-wrap',
    marginTop: '10px',
    color: '#333',
  },
};
