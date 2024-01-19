import './OrganizerInterface.css'
import { useEffect, useState } from 'react'
import Conference from './Conference'
import './OrganizerInterface.css'
import { Link } from "react-router-dom";

const SERVER = 'http://localhost:8080'

function OrganizerInterface (props) {
  const [conferences, setConferences] = useState([])

  const getConferences = async () => {
    try {
      const response = await fetch(`${SERVER}/organizers/${localStorage.userId}/allConferinte`);
      const data = await response.json();

      // Verificați dacă există cheia "conferences" în răspuns
      if (data && data.conferences) {
        setConferences(data.conferences);
      } else {
        console.error("Răspunsul nu conține cheia așteptată.");
      }
    } catch (error) {
      console.error("Eroare la preluarea conferințelor:", error);
    }
  };

  const addConference = async conference => {
    await fetch(`${SERVER}/conferences`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(conference)
    })
    getConferences()
  }

  // if useEffect is called with an empty dependencies array, it will run the
  //callback only once, when the component is rendered for the first time

  useEffect(() => {
    getConferences() // fetch the data from the express server (start the server first!)
  }, [])

  return (
    <div>
      <h3>Organizer Interface</h3>
      <div className='add-conference'>
        <Link to="/add-conference">Add User</Link>
      </div>
      <div className='conference-list'>
      
      {/* render a "User" component for every data entry
      the key attribute is used by react for list management
      pass data to the "User" component through "item" prop => how you name the prop is up to you
      access the data in the "User" component by props.item */}
      {conferences.length > 0 && conferences?.map(e => <Conference key={e.id} item={e} />)}
    </div>
    </div>
    
  );
}

export default OrganizerInterface
