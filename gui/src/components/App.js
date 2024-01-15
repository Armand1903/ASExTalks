import React, { useState } from 'react';
import Login from './Login';
import OrganizerInterface from './OrganizerInterface';
import ReviewerInterface from './ReviewerInterface';
import AuthorInterface from './AuthorInterface';
import './App.css';

export default function App() {
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setUserRole(role);
  };

  return (
    <div>
      <div className="App">
      <header className="App-header">
      <h1 className='Logo'>ASExTalks</h1>
      {userRole ? (
        // Render component based on user role
        userRole === 'organizer' ? (
          <OrganizerInterface />
        ) : userRole === 'reviewer' ? (
          <ReviewerInterface />
        ) : userRole === 'author' ? (
          <AuthorInterface />
        ) : null
      ) : (
        // Render login component if the user is not logged in
        <Login onLogin={handleLogin} />
      )}
      </header>
    </div>
    </div>
  );
}
