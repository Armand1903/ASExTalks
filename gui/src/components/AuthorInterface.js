import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Conference from './Conference';
import './AuthorInterface.css';

const SERVER = 'http://localhost:8080'

function AutorInterface() {
  const [conferences, setConferences] = useState([])

  const getConferences = async () => {
      const response = await fetch(`${SERVER}/conferintes`);
      const data = await response.json();
      setConferences(data);
  };

  useEffect(() => {
    getConferences() // fetch the data from the express server (start the server first!)
  }, [])

  return (
    <div>
      <h3>Author Interface</h3>
      <div className='conference-list'>
        {conferences.length > 0 &&
          conferences?.map((conference) => (
            <Link key={conference.id} to={`/conferenceInterface/${conference.id}`}>
              <Conference item={conference} />
            </Link>
          ))}
      </div>
    </div>
    
  );
}

export default AutorInterface;
