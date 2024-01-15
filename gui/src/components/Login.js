import React, { useState } from 'react';
import './Login.css';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.profile.role); // Pass the user role to the parent component
      } else {
         // Actualizează starea pentru a afișa mesajul de eroare utilizatorului
        setErrorMessage('Username sau parola incorecte!');
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <div className="text-center m-5-auto">
      <h2>Sign in to us</h2>
      <form onSubmit={handleSubmit}>
          <p className='form-element'>
                    <label>Username or email address</label><br/>
                    <input type="text" name="first_name" required onChange={(e) => setUsername(e.target.value)} />
                </p>
                <p className='form-element'>
                    <label>Password</label>
                    <label className="right-label">Forget password?</label>
                    <br/>
                    
                  <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)} />

                </p>
                <p className='form-element'>
                    <button id="sub_btn" type="submit">Login</button>
               </p>
      </form>
      <footer>
          <div className="error-message-container">
          <p className="error-message">{errorMessage}</p>
        </div>
      </footer>
    </div>
  );
}