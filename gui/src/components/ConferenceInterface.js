import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ConferenceInterface.css'; // Importă fișierul CSS pentru stilizare

const SERVER = 'http://localhost:8080';

function ConferenceInterface() {
  const { id } = useParams();
  const [conference, setConference] = useState(null);
  const [articleTitle, setArticleTitle] = useState('');

  const getConferenceDetails = async () => {
    try {
      const response = await fetch(`${SERVER}/conferintes/${id}`);
      const data = await response.json();
      setConference(data);
    } catch (error) {
      console.error('Error fetching conference details:', error);
    }
  };

  useEffect(() => {
    getConferenceDetails();
  }, [id]);

  const handleTitleChange = (event) => {
    setArticleTitle(event.target.value);
  };

  if (!conference) {
    return <div>Loading...</div>;
  }

  return (
    <div className="conference-interface">
      <div className="conference-details">
        <h4>{conference.nume}</h4>
        <p>{conference.descriere}</p>
        {/* Alte detalii despre conferință */}
      </div>
      
      <div className="article-proposal">
        <h4>Propune un articol</h4>
        <div className="input-area-conference-interface">
          <input
            className='input-title'
            type="text"
            value={articleTitle}
            onChange={handleTitleChange}
            placeholder="Introduceți titlul articolului..."
          />
        </div>
        <textarea
          className="proposal-text"
          placeholder="Introduceți propunerea dvs. aici..."
        />
        <button className="submit-button">Trimite propunerea</button>
      </div>
    </div>
  );
}

export default ConferenceInterface;
