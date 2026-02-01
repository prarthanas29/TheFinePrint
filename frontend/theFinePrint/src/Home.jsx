import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const documents = [
  { id: 1, title: "Paris Agreement Withdrawal", category: "Environment", type: "Executive Order", color: "#2563eb" },
  { id: 2, title: "Health Care for All Patients", category: "Healthcare", type: "Bill",  color: "#3b82f6"},
  { id: 3, title: "AI Innovation Act", category: "Technology", type: "Bill", color: "#1d4ed8"},
  { id: 4, title: "Election Integrity", category: "Civil Rights", type: "Executive Order", color: "#1e3a8a" },
  { id: 5, title: "Women's Health Research", category: "Healthcare", type: "Executive Order", color: "#60a5fa"}
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDocumentClick = async (doc) => {
    navigate('/result', { state: { document: doc, category: doc.title } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">📜</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900">The Fine Print</h1>
              <p className="text-xs text-gray-500 font-medium">AI-Powered Policy Analysis • HackViolet 2026</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-gray-900 mb-2">Select a Policy to Analyze</h2>
          <p className="text-gray-600">Click any document to get AI-powered insights in plain English</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {documents.map(doc => (
            <button
              key={doc.id}
              onClick={() => handleDocumentClick(doc)}
              className="group p-6 bg-white border-2 border-gray-200 rounded-2xl text-left hover:border-indigo-500 hover:shadow-xl transition-all hover:-translate-y-1"
              
            >
              <div 
                style={{ backgroundColor: doc.color }} 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-black mb-6 shadow-lg shadow-blue-100"
              >
                {doc.category.charAt(0)}
              </div>
              <h3 className="font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">{doc.title}</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-xs font-bold shadow">
                  {doc.type}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold">
                  {doc.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}