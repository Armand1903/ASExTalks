import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SERVER = 'http://localhost:8080';

function ConferenceInterface() {
  const { id } = useParams();
  const [conference, setConference] = useState(null);

  const getConferenceDetails = async () => {
    const response = await fetch(`${SERVER}/conferintes/${id}`);
    const data = await response.json();
    setConference(data);
  };

  useEffect(() => {
    getConferenceDetails();
  }, [id]);

  if (!conference) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Conference Interface</h3>
      <div>
        <h4>{conference.nume}</h4>
        <p>{conference.descriere}</p>
        {/* Alte detalii despre conferință */}
      </div>
    </div>
  );
}

export default ConferenceInterface;
