import React, { useState, useEffect } from "react";
import Login from "./Login";
import OrganizerInterface from "./OrganizerInterface";
import ReviewerInterface from "./ReviewerInterface";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthorInterface from "./AuthorInterface";
import ConferenceInterface from "./ConferenceInterface";
import ArticleInterface from "./ArticleInterface";
import AddConference from "./AddConference";
import "./App.css";

export default function App() {
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setUserRole(role);

    // Salvăm rolul utilizatorului în localStorage
    localStorage.setItem("userRole", role);
  };

  const checkUserRoleFromStorage = () => {
    // Verificăm dacă există informații despre utilizator în localStorage
    const storedUserRole = localStorage.getItem("userRole");

    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  };

  useEffect(() => {
    checkUserRoleFromStorage();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="Logo">ASExTalks</h1>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            {userRole ? (
              <>
                <Route path="/organizer" element={<OrganizerInterface />} />
                <Route path="/reviewer" element={<ReviewerInterface />} />
                <Route path="/author" element={<AuthorInterface />} />
              </>
            ) : (
              <Route path="/*" element={<Navigate to="/login" replace />} />
            )}
            <Route path="/add-conference" element={<AddConference />} />
            <Route path="/conferenceInterface/:id" element={<ConferenceInterface />} />
            <Route path="/articleInterface/:id" element={<ArticleInterface />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}
