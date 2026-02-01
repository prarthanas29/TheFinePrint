import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = ["technology", "healthcare", "environment", "immigration"];

function Home() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    // You can send the category to backend here, or pass to Result page
    navigate('/result', { state: { category } });
  };

  return (
    <div>
      <h1>Welcome to The Fine Print</h1>
      <p>Our aim is to make legal and policy documents easy to understand.</p>
      <div>
        {categories.map(cat => (
          <button key={cat} onClick={() => handleCategoryClick(cat)}>
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;