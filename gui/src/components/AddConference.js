import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddConference.css";

const SERVER = 'http://localhost:8080'

function AddConference() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reviewers, setReviewers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedReviewers, setSelectedReviewers] = useState([]);

  useEffect(() => {
    const fetchReviewers = async () => {
      try {
        const response = await fetch(`${SERVER}/freeReviewers`);
        const data = await response.json();

        if (data && Array.isArray(data)) {
          setReviewers(data);
        }
      } catch (error) {
        console.error('Error fetching reviewers:', error);
      }
    };

    fetchReviewers();
  }, []);

  const handleAddUser = async (event) => {
    event.preventDefault();

    if (selectedReviewers.length < 2) {
      alert("Selectează cel puțin 2 revieweri!");
      return;
    }

    try {
      // Creează conferința și obține id-ul
      const conferenceResponse = await fetch(`${SERVER}/conferintes`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descriere: description, nume: title, organizatorId: localStorage.userId })
      });
      const conferenceData = await conferenceResponse.json();
      const conferenceId = conferenceData.id;

      // Actualizează conferintumId pentru fiecare recenzor selectat
      for (const reviewerId of selectedReviewers) {
        await fetch(`${SERVER}/reviewers/${reviewerId}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ conferintumId: conferenceId })
        });
      }

      navigate("/organizer");
    } catch (error) {
      console.error('Error adding conference:', error);
    }
  };

  const handleReviewerChange = (reviewerId) => {
    const isSelected = selectedReviewers.includes(reviewerId);

    if (isSelected) {
      setSelectedReviewers(selectedReviewers.filter((id) => id !== reviewerId));
    } else {
      setSelectedReviewers([...selectedReviewers, reviewerId]);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <h1>Add User Page</h1>
      <form onSubmit={handleAddUser}>
        <div className="input-area">
          <label>Titlul articolului:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="input-area">
          <label>Textul articolului:</label>
          <textarea id="article-text" rows="15" cols="70" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="input-area">
          <label>Revieweri:</label>
          <div className="dropdown-container">
            <div className="dropdown-header" onClick={toggleDropdown}>
              Selectează Revieweri
            </div>
            {isDropdownOpen && (
              <div className="dropdown-list">
                {reviewers.map((reviewer) => (
                  <div key={reviewer.id}>
                    <input
                      type="checkbox"
                      id={reviewer.id}
                      value={reviewer.id}
                      checked={selectedReviewers.includes(reviewer.id)}
                      onChange={() => handleReviewerChange(reviewer.id)}
                    />
                    <label htmlFor={reviewer.id}>{reviewer.fullName}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          <button type="submit">Add Conference</button>
        </div>
      </form>
    </div>
  );
}

export default AddConference;
