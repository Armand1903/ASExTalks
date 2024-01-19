import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ConferenceInterface.css'; // Importă fișierul CSS pentru stilizare
import { useNavigate } from "react-router-dom";


const SERVER = 'http://localhost:8080';

function ConferenceInterface() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [conference, setConference] = useState(null);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleBody, setArticleBody] = useState('');

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

  const handleProposalSubmit = async () => {
    try {
      const response = await fetch(`${SERVER}/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          autorId: localStorage.userId,
          body: articleBody,
          conferintumId: parseInt(id), // Asigură-te că este trimis ca număr
          title: articleTitle,
        }),
      });

      if (response.ok) {
        console.log('Articolul a fost trimis cu succes!');
        // Aici poți adăuga orice actualizare suplimentară a stării sau redirecționare
      } else {
        console.error('Eroare la trimiterea articolului:', response.statusText);
      }
      navigate("/author");
    } catch (error) {
      console.error('Eroare la trimiterea articolului:', error);
    }
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
          value={articleBody}
          onChange={(e) => setArticleBody(e.target.value)}
          placeholder="Introduceți propunerea dvs. aici..."
        />
        <button className="submit-button" onClick={handleProposalSubmit}>
          Trimite propunerea
        </button>
      </div>
    </div>
  );
}

export default ConferenceInterface;
