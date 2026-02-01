import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category;
  const document = location.state?.document;
  
  const [activeTab, setActiveTab] = useState('translation');
  const [analyses, setAnalyses] = useState({
    translation: '',
    predictions: '',
    actions: ''
  });
  const [loading, setLoading] = useState({
    translation: false,
    predictions: false,
    actions: false
  });

  const tabs = [
    { id: 'translation', label: 'What Does This Mean?'},
    { id: 'predictions', label: 'What Happened Before?' },
    { id: 'actions', label: 'What Can I Do?'}
  ];

  const fetchAnalysis = async (tab) => {
    if (analyses[tab]) return;
    
    setLoading(prev => ({ ...prev, [tab]: true }));
    
    try {
      const res = await fetch('http://localhost:8000/explanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, tab })
      });
      
      const data = await res.json();
      setAnalyses(prev => ({ ...prev, [tab]: data.explanation }));
      
    } catch (error) {
      console.error('Error:', error);
    }
    
    setLoading(prev => ({ ...prev, [tab]: false }));
  };

  useEffect(() => {
    if (category) {
      fetchAnalysis('translation');
    }
  }, [category]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    fetchAnalysis(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-black text-gray-900">The Fine Print</h1>
              <p className="text-xs text-gray-500 font-medium">Analysis Results</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="px-5 py-2.5 bg-white border-2 border-gray-200 hover:border-indigo-300 rounded-xl font-bold text-sm transition-all hover:shadow-md"
          >
            ← Back
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          
          {/* Document Header */}
          {document && (
            <div className="p-10 pb-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-b-2 border-indigo-100">
              <h2 className="text-4xl font-black text-gray-900 mb-5 leading-tight">
                {document.title}
              </h2>
              <div className="flex flex-wrap gap-3">
                <span className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-bold shadow-lg">
                  {document.type}
                </span>
                <span className="px-5 py-2 bg-white text-gray-700 rounded-xl text-sm font-bold border-2 border-gray-300 shadow-sm">
                  {document.category}
                </span>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="px-8 pt-8 bg-white">
            <div className="flex gap-0 border-b border-slate-100">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`pb-5 px-10 font-black text-[10px] tracking-[0.2em] uppercase transition-all relative ${
                    activeTab === tab.id
                      ? 'text-blue-700 bg-blue-50/30' 
                      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 shadow-[0_-4px_10px_rgba(37,99,235,0.3)]"></div>
                  )}
                  <div className="flex items-center justify-center">
                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-10 min-h-[500px]">
            {loading[activeTab] ? (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="relative mb-6">
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-indigo-600"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl">{tabs.find(t => t.id === activeTab)?.icon}</span>
                  </div>
                </div>
                <p className="font-black text-gray-900 text-lg mb-2">Analyzing with AI...</p>
                <p className="text-sm text-gray-500">Generating insights from policy documents</p>
              </div>
            ) : analyses[activeTab] ? (
              <div className="space-y-6">
                {/* Content with nice styling */}
                <div className="prose prose-lg prose-indigo max-w-none
                  prose-headings:font-black prose-headings:text-gray-900
                  prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:pb-2 prose-h2:border-b-2 prose-h2:border-indigo-100
                  prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
                  prose-p:text-gray-700 prose-p:leading-relaxed
                  prose-strong:text-gray-900 prose-strong:font-bold
                  prose-ul:my-4 prose-li:my-2
                  prose-code:bg-indigo-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-indigo-900 prose-code:font-semibold
                ">
                  <ReactMarkdown
                    components={{
                      h2: ({node, ...props}) => (
                        <h2 className="text-2xl font-black text-blue-900 mb-6 mt-12 flex items-center gap-4 border-b border-blue-100 pb-4" {...props} />
                      ),
                      li: ({node, ...props}) => (
                        <li className="flex items-start gap-5 p-6 bg-white border border-blue-50 rounded-2xl shadow-sm hover:border-blue-200 transition-all mb-4 list-none">
                          <div className="mt-1 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-xs shadow-md shadow-blue-100">
                            {activeTab === 'actions' ? '⚡' : '✓'}
                          </div>
                          <div className="text-lg text-slate-700 leading-snug font-medium">{props.children}</div>
                        </li>
                      ),
                      ul: ({node, ...props}) => <ul className="pl-0" {...props} />,
                      p: ({node, ...props}) => (
                        <p className="text-gray-700 leading-relaxed" {...props} />
                      ),
                    }}
                  >
                    {analyses[activeTab]}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-gray-400 font-medium">Click a tab to load analysis</p>
              </div>
            )}
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Result;