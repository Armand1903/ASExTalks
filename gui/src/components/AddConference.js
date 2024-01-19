import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddConference.css";

function AddConference() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [reviewers, setReviewers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedReviewers, setSelectedReviewers] = useState([]);

  useEffect(() => {
    // Emulează o cerere către baza de date pentru a obține lista de revieweri
    // Înlocuiește această parte cu logica ta de backend
    const mockReviewers = ["Reviewer1", "Reviewer2", "Reviewer3"];
    setReviewers(mockReviewers);
  }, []);

  const handleAddUser = (event) => {
    event.preventDefault();
    console.log("User added:", { username, fullName, selectedReviewers });
    navigate("/organizer");
  };

  const handleReviewerChange = (reviewer) => {
    const isSelected = selectedReviewers.includes(reviewer);

    if (isSelected) {
      setSelectedReviewers(selectedReviewers.filter((r) => r !== reviewer));
    } else {
      setSelectedReviewers([...selectedReviewers, reviewer]);
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
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-area">
          <label>Textul articolului:</label>
          <textarea id="article-text" rows="15" cols="70" value={fullName} onChange={(e) => setFullName(e.target.value)} />
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
                  <div key={reviewer}>
                    <input
                      type="checkbox"
                      id={reviewer}
                      value={reviewer}
                      checked={selectedReviewers.includes(reviewer)}
                      onChange={() => handleReviewerChange(reviewer)}
                    />
                    <label htmlFor={reviewer}>{reviewer}</label>
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




  

  