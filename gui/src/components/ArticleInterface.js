import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SERVER = 'http://localhost:8080';

function ArticleInterface() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [feedback, setFeedback] = useState('');

  const getArticleDetails = async () => {
    const response = await fetch(`${SERVER}/articles/${id}`);
    const data = await response.json();
    setArticle(data);
  };

//   const handleFeedbackSubmit = async () => {
//     // Assuming you have an API endpoint for submitting feedback
//     await fetch(`${SERVER}/articles/${id}/feedback`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ feedback }),
//     });

//     // Optional: You might want to refresh article details after submitting feedback
//     getArticleDetails();
//   };



//   const handleStatusChange = async () => {
//     // Assuming you have an API endpoint for changing the article status
//     await fetch(`${SERVER}/articles/${id}/changeStatus`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       // Optional: You can include a request body if needed
//       // body: JSON.stringify({ newStatus: 'someNewStatus' }),
//     });

//     // Optional: You might want to refresh article details after changing status
//     getArticleDetails();
//   };

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
       

        {/*{{article.status === 1 && (
          <div>
            <input
              type="text"
              placeholder="Enter your feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button onClick={handleFeedbackSubmit}>Give Feedback</button>
          </div>
        )}

        <button onClick={handleStatusChange}>Change Status</button> }*/}
      </div>
    </div>
  );
}

export default ArticleInterface;
