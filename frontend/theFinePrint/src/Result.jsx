import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Result() {
  const location = useLocation();
  const category = location.state?.category;
  const [summary, setSummary] = useState("");
  const [docLink, setDocLink] = useState("");

  useEffect(() => {
    if (category) {
      // Fetch summary from backend
      fetch('http://localhost:8000/explanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category })
      })
      .then(res => res.json())
      .then(data => {
        setSummary(data.explanation);
        // setDocLink(data.link); // If you return a link from backend
      });
    }
  }, [category]);

  return (
    <div>
      <h2>Summary for {category}</h2>
      <p>{summary}</p>
      {docLink && <a href={docLink}>Read full document</a>}
    </div>
  );
}

export default Result;