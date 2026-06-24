import { useState } from 'react';
import { aiApi } from '../services/aiApi';
import { Sparkles, Copy, Check } from 'lucide-react';

export function EmailGenerator() {
  const [context, setContext] = useState('');
  const [tone, setTone] = useState('Professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!context.trim()) return;
    setIsGenerating(true);
    setGeneratedEmail('');
    try {
      const result = await aiApi.generateEmail(context, tone);
      setGeneratedEmail(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors">Smart Email Generator</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 transition-colors">Draft professional emails in seconds using AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-4 transition-colors duration-300">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Email Context / Draft</label>
            <textarea 
              className="w-full h-48 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
              placeholder="E.g., Remind John about the Q3 report due next Friday..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Tone</label>
            <select 
              className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-gray-900 dark:text-gray-100 transition-colors duration-300"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="Professional">Professional</option>
              <option value="Friendly">Friendly</option>
              <option value="Persuasive">Persuasive</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !context.trim()}
            className="mt-2 w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Sparkles size={18} />
            )}
            {isGenerating ? 'Generating...' : 'Generate Email'}
          </button>
        </div>

        {/* Output Section */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors">Generated Email</h3>
            {generatedEmail && (
              <button 
                onClick={handleCopy}
                className="text-sm flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            )}
          </div>
          
          <div className="flex-1 relative">
            {isGenerating ? (
              <div className="absolute inset-0 flex flex-col gap-3 p-2">
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-1/2 mt-4"></div>
              </div>
            ) : generatedEmail ? (
              <textarea 
                className="w-full h-full min-h-[300px] p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none leading-relaxed text-gray-700 dark:text-gray-300 transition-colors duration-300"
                value={generatedEmail}
                onChange={(e) => setGeneratedEmail(e.target.value)}
              />
            ) : (
              <div className="w-full h-full min-h-[300px] border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-600 transition-colors duration-300">
                Generated email will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
