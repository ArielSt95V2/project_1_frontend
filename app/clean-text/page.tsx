'use client';

import React, { useState } from 'react';
import axios from 'axios';

const CleanTextPage: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [cleanedText, setCleanedText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/chat/clean-text/`, {
        text: inputText,
      });
      setCleanedText(response.data.cleaned_text);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Text Cleaner</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to clean"
          rows={6}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Clean Text
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {cleanedText && (
        <div>
          <h2>Cleaned Text</h2>
          <p style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{cleanedText}</p>
        </div>
      )}
    </div>
  );
};

export default CleanTextPage;
