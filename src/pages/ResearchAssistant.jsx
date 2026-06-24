import { useState } from 'react';
import { aiApi } from '../services/aiApi';
import { Search, Lightbulb, TrendingUp, Check } from 'lucide-react';

export function ResearchAssistant() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  
  // Local state for editable fields
  const [summary, setSummary] = useState('');
  const [insights, setInsights] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setResult(null);
    try {
      const data = await aiApi.researchTopic(topic);
      setResult(data);
      setSummary(data.summary);
      setInsights(data.insights);
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors">AI Research Assistant</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 transition-colors">Enter a topic or paste an article to get summaries, key insights, and strategic recommendations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-4 transition-colors duration-300">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Topic or Article Text</label>
          <textarea 
            className="w-full h-40 lg:h-64 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none leading-relaxed text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
            placeholder="e.g., The impact of AI on digital marketing..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !topic.trim()}
            className="mt-2 w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Search size={18} />
            )}
            {isGenerating ? 'Researching...' : 'Conduct Research'}
          </button>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 min-h-[500px] transition-colors duration-300">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6 transition-colors">Research Findings</h3>
          
          <div className="relative">
            {isGenerating ? (
              <div className="space-y-6">
                <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-full"></div>
                <div className="space-y-3">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
                  <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-full"></div>
                  <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-full"></div>
                </div>
              </div>
            ) : result ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {/* 1. Summary */}
                <section>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 transition-colors">
                    <Search size={16} className="text-primary-600 dark:text-primary-400"/> Summary
                  </h4>
                  <textarea
                    className="w-full p-4 bg-primary-50/50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-900/50 rounded-xl text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary-500 resize-none min-h-[100px] transition-colors duration-300"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 2. Key Insights */}
                  <section>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2 transition-colors">
                      <Lightbulb size={16} className="text-amber-500 dark:text-amber-400"/> Key Insights
                    </h4>
                    <ul className="space-y-3">
                      {insights.map((insight, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 mt-2 flex-shrink-0" />
                          <textarea
                            className="flex-1 bg-transparent border-b border-transparent hover:border-gray-200 dark:hover:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 outline-none text-gray-700 dark:text-gray-300 text-sm resize-none h-auto overflow-hidden transition-colors"
                            value={insight}
                            onChange={(e) => {
                              const newInsights = [...insights];
                              newInsights[idx] = e.target.value;
                              setInsights(newInsights);
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* 3. Strategic Recommendations */}
                  <section>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2 transition-colors">
                      <TrendingUp size={16} className="text-green-500 dark:text-green-400"/> Recommendations
                    </h4>
                    <ul className="space-y-3">
                      {recommendations.map((rec, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                          <Check size={16} className="text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <textarea
                            className="flex-1 bg-transparent border-b border-transparent hover:border-gray-200 dark:hover:border-gray-700 focus:border-green-500 dark:focus:border-green-400 outline-none text-gray-700 dark:text-gray-300 text-sm resize-none h-auto overflow-hidden transition-colors"
                            value={rec}
                            onChange={(e) => {
                              const newRecs = [...recommendations];
                              newRecs[idx] = e.target.value;
                              setRecommendations(newRecs);
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            ) : (
              <div className="h-64 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-600 p-8 text-center transition-colors duration-300">
                Your research summary, insights, and recommendations will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
