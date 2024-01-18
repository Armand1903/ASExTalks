import React, { useState } from 'react';
import './AuthorInterface.css';

function AutorInterface() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Articol trimis:', { title, content });
  };

  return (
    <div className="author-interface">
      <h1>Interfață Autor</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Titlu:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Conținut:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <button type="submit">Trimite Articol</button>
      </form>
    </div>
  );
}

export default AutorInterface;
