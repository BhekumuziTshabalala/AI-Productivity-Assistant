import { useState } from 'react';
import { aiApi } from '../services/aiApi';
import { ListTodo, Clock, AlertCircle, ArrowRight } from 'lucide-react';

export function TaskPlanner() {
  const [tasksText, setTasksText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [tasks, setTasks] = useState({ high: [], medium: [], low: [] });
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = async () => {
    if (!tasksText.trim()) return;
    setIsGenerating(true);
    try {
      const data = await aiApi.planTasks(tasksText);
      setTasks(data);
      setHasGenerated(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const Column = ({ title, items, colorClass, icon: Icon, timeBlock, category }) => (
    <div className="flex flex-col bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
        <Icon size={18} className={colorClass} />
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h4>
        <span className="ml-auto text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700">
          {timeBlock}
        </span>
      </div>
      
      <div className="flex-1 space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 cursor-text transition-colors duration-300">
             <input
                className="w-full text-sm text-gray-700 dark:text-gray-300 outline-none bg-transparent transition-colors"
                value={item}
                onChange={(e) => {
                  const newTasks = { ...tasks };
                  newTasks[category][idx] = e.target.value;
                  setTasks(newTasks);
                }}
             />
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center text-sm text-gray-400 dark:text-gray-500 py-4 italic">No tasks</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors">AI Task Planner</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 transition-colors">Brain-dump your day, and let AI organize it by priority and time blocks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-4 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-4 transition-colors duration-300">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Brain-Dump Tasks</label>
          <textarea 
            className="w-full h-48 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none leading-relaxed text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
            placeholder="Type all the things you need to do today..."
            value={tasksText}
            onChange={(e) => setTasksText(e.target.value)}
          />

          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !tasksText.trim()}
            className="mt-2 w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <ListTodo size={18} />
            )}
            {isGenerating ? 'Organizing...' : 'Organize My Day'}
          </button>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-8 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-300">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors">Your Structured Schedule</h3>
          </div>
          
          {isGenerating ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-800 h-64">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-12 bg-white dark:bg-gray-900 rounded-lg animate-pulse w-full"></div>
                    <div className="h-12 bg-white dark:bg-gray-900 rounded-lg animate-pulse w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : hasGenerated ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Column 
                title="High Priority" 
                items={tasks.high} 
                category="high"
                colorClass="text-red-500 dark:text-red-400" 
                icon={AlertCircle} 
                timeBlock="Morning" 
              />
              <Column 
                title="Medium Priority" 
                items={tasks.medium} 
                category="medium"
                colorClass="text-amber-500 dark:text-amber-400" 
                icon={Clock} 
                timeBlock="Afternoon" 
              />
              <Column 
                title="Low Priority" 
                items={tasks.low} 
                category="low"
                colorClass="text-blue-500 dark:text-blue-400" 
                icon={ArrowRight} 
                timeBlock="Late/When Free" 
              />
            </div>
          ) : (
            <div className="h-64 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-600 p-8 text-center transition-colors duration-300">
              Your organized Kanban board will appear here once generated.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
