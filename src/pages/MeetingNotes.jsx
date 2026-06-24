import { useState } from 'react';
import { aiApi } from '../services/aiApi';
import { FileText, Copy, Check, CheckSquare } from 'lucide-react';

export function MeetingNotes() {
  const [transcript, setTranscript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // We keep local state for the editable fields
  const [summary, setSummary] = useState('');
  const [actionItems, setActionItems] = useState([]);
  const [deadlines, setDeadlines] = useState([]);

  const handleGenerate = async () => {
    if (!transcript.trim()) return;
    setIsGenerating(true);
    setResult(null);
    try {
      const data = await aiApi.summarizeMeetingNotes(transcript);
      setResult(data);
      setSummary(data.summary);
      setActionItems(data.actionItems.map(item => ({ text: item, done: false })));
      setDeadlines(data.deadlines);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = `
Executive Summary:
${summary}

Action Items:
${actionItems.map(i => `- [${i.done ? 'x' : ' '}] ${i.text}`).join('\n')}

Deadlines:
${deadlines.map(d => `- ${d}`).join('\n')}
    `.trim();
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors">Meeting Notes Summarizer</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 transition-colors">Paste raw transcripts to extract summaries, actions, and deadlines.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-4 transition-colors duration-300">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Raw Transcript / Notes</label>
          <textarea 
            className="flex-1 min-h-[300px] p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none leading-relaxed text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
            placeholder="Paste your messy meeting notes or auto-generated transcript here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />

          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !transcript.trim()}
            className="mt-2 w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <FileText size={18} />
            )}
            {isGenerating ? 'Analyzing...' : 'Summarize Notes'}
          </button>
        </div>

        {/* Output Section */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col h-[600px] overflow-y-auto transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors">Structured Output</h3>
            {result && (
              <button 
                onClick={handleCopy}
                className="text-sm flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          
          <div className="flex-1 relative">
            {isGenerating ? (
              <div className="space-y-8">
                {/* Skeleton blocks */}
                <div className="space-y-3">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
                  <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
                  <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-full"></div>
                  <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-full"></div>
                </div>
              </div>
            ) : result ? (
              <div className="space-y-8">
                {/* 1. Executive Summary */}
                <section>
                  <h4 className="text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3 transition-colors">1. Executive Summary</h4>
                  <textarea
                    className="w-full min-h-[100px] p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                </section>

                {/* 2. Action Items */}
                <section>
                  <h4 className="text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3 transition-colors">2. Action Items</h4>
                  <div className="space-y-2">
                    {actionItems.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                        <button 
                          className={`mt-1 flex-shrink-0 transition-colors ${item.done ? 'text-primary-500 dark:text-primary-400' : 'text-gray-300 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-500'}`}
                          onClick={() => {
                            const newItems = [...actionItems];
                            newItems[idx].done = !newItems[idx].done;
                            setActionItems(newItems);
                          }}
                        >
                          <CheckSquare size={20} />
                        </button>
                        <input 
                          type="text"
                          className={`flex-1 bg-transparent border-none outline-none transition-colors duration-300 ${item.done ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}
                          value={item.text}
                          onChange={(e) => {
                            const newItems = [...actionItems];
                            newItems[idx].text = e.target.value;
                            setActionItems(newItems);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </section>

                {/* 3. Deadlines */}
                <section>
                  <h4 className="text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3 transition-colors">3. Deadlines / Dates</h4>
                  <ul className="space-y-2">
                    {deadlines.map((deadline, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-400 dark:bg-red-500 flex-shrink-0" />
                        <input 
                          type="text"
                          className="flex-1 p-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 outline-none focus:ring-1 focus:ring-primary-500 transition-colors duration-300"
                          value={deadline}
                          onChange={(e) => {
                            const newDeadlines = [...deadlines];
                            newDeadlines[idx] = e.target.value;
                            setDeadlines(newDeadlines);
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            ) : (
              <div className="h-full border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-600 p-8 text-center transition-colors duration-300">
                Your structured summary will appear here, divided into Summary, Action Items, and Deadlines.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
