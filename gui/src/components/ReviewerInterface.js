import './ReviewerInterface.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Article from './Article'; // Assuming you have a component named Article




const SERVER = 'http://localhost:8080';

function ReviewerInterface() {
  const [articles, setArticles] = useState([]); // Updated state and variable names

  const getArticles = async () => { // Updated function name
    try {
      const response = await fetch(`${SERVER}/reviewer/${localStorage.userId}/getArticles`); // Updated endpoint
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    getArticles(); // Fetch the data from the express server (start the server first!)
  }, []);

  return (
    <div>
      <h3>Reviewer Interface</h3>
      <div className='article-list'> {/* Updated class name */}
        {articles.length > 0 &&
          articles?.map((article) => ( // Updated variable name
            <Link key={article.id} to={`/articleInterface/${article.id}`}> {/* Updated link and variable name */}
              <Article item={article} />
            </Link>
          ))}
      </div>
    </div>
  );
}


export default ReviewerInterface
