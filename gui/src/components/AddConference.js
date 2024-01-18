import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddConference.css";

function AddConference() {
  const navigate = useNavigate(); // Folosește useNavigate în loc de useHistory
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  const handleAddUser = (event) => {
    event.preventDefault();
    console.log("User added:", { username, fullName });
    navigate("/organizer"); // Folosește navigate în loc de history.push
  };

  return (
    <div>
      <h1>Add User Page</h1>
      <form onSubmit={handleAddUser}>
        <div className="input-area">
            <label>Titlul articolului:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="input-area">
            <label>Textul articolului:</label>
            <textarea id="article-text" rows="15" cols="70" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div><button type="submit">Add Conference</button></div>
      </form>
    </div>
  );
}

export default AddConference;
