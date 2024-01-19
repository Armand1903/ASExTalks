import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SERVER = "http://localhost:8080";

function ArticleInterface() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const getArticleDetails = async () => {
    const response = await fetch(`${SERVER}/articles/${id}`);
    const data = await response.json();
    setArticle(data);
    setIsChecked(data.status === 1);
    setFeedback(""); // Initialize feedback with existing feedback if any
  };

  const handleUpdate = async () => {
    const updatedArticle = {
      ...article,
      feedback: feedback,
      status: isChecked ? 1 : 0,
    };

    await fetch(`${SERVER}/articles/${updatedArticle.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedArticle),
    });

    getArticleDetails();
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  useEffect(() => {
    getArticleDetails();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Article Interface</h3>
      <div>
        <h4>{article.title}</h4>
        <p>{article.body}</p>

        <input
          type="text"
          placeholder="Enter your feedback"
          style={{ width: "300px", height: "40px", padding: "5px", margin: "10px" }}
          value={feedback}
          onChange={handleFeedbackChange}
        />
      </div>
      <label
        htmlFor="approvalCheckbox"
        // style={{ display: "flex", alignItems: "center", gap: "5px" }}
      >
        <input
          type="checkbox"
          id="approvalCheckbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        {isChecked ? "Aprobat" : "Neaprobat"}
      </label>

      <div>
        <button onClick={handleUpdate}>Actualizează articol</button>
      </div>
    </div>
  );
}

export default ArticleInterface;
