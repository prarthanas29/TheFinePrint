import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category;
  const document = location.state?.document;
  
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      setLoading(true);
      // Fetch summary from backend
      fetch('http://localhost:8000/explanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category })
      })
      .then(res => res.json())
      .then(data => {
        setSummary(data.explanation);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
    }
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">The Fine Print</h1>
            <p className="text-sm text-gray-500">Analysis Results</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
          >
            ← Back to Documents
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* Document Header */}
          {document && (
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {document.title}
              </h2>
              <div className="flex gap-3">
                <span className="px-4 py-1 bg-indigo-600 text-white rounded-lg text-sm font-bold">
                  {document.type}
                </span>
                <span className="px-4 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold">
                  {document.category}
                </span>
              </div>
            </div>
          )}

          {/* AI Explanation */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">AI Analysis</h3>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <p className="mt-2 text-gray-600">Analyzing...</p>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;