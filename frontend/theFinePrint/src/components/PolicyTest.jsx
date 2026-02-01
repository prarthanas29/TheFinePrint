import { useState } from 'react';

export default function PolicyTest() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      const res = await fetch('http://localhost:8000/explanation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: input
        })
      });
      
      const data = await res.json();
      setResponse(data.explanation);
      
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error connecting to backend');
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">The Fine Print - Backend Test</h1>
      
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a policy question..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {loading ? 'Asking Gemini...' : 'Send to Backend'}
      </button>
      
      {response && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="font-bold mb-2">Response from Gemini:</h2>
          <p className="text-gray-700">{response}</p>
        </div>
      )}
    </div>
  );
}