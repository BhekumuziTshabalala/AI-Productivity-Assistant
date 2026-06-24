import { NavLink } from 'react-router-dom';
import { 
  Mail, 
  FileText, 
  ListTodo, 
  Search, 
  MessageSquare, 
  Menu,
  X,
  Moon,
  Sun
} from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

const navItems = [
  { name: 'Email Generator', path: '/', icon: Mail },
  { name: 'Meeting Notes', path: '/meeting-notes', icon: FileText },
  { name: 'Task Planner', path: '/task-planner', icon: ListTodo },
  { name: 'Research Assistant', path: '/research', icon: Search },
  { name: 'AI Chatbot', path: '/chat', icon: MessageSquare },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-md shadow-md text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none transition-colors"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-gray-900/50 dark:bg-black/60 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside 
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 transition-all duration-300 ease-in-out flex flex-col shadow-sm dark:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-xl shadow-inner">
              A
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">AI Assistant</h1>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                  isActive 
                    ? "bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 shadow-sm" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200"
                )}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={20} className={isActive ? "text-primary-600 dark:text-primary-400" : "text-gray-400 dark:text-gray-500"} />
                    {item.name}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Theme Toggle Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-colors"
          >
            <span className="flex items-center gap-3">
              {isDark ? <Moon size={20} className="text-primary-400" /> : <Sun size={20} className="text-amber-500" />}
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
            <div className={clsx(
              "w-10 h-5 rounded-full relative transition-colors duration-300",
              isDark ? "bg-primary-600" : "bg-gray-300"
            )}>
              <div className={clsx(
                "absolute top-1 w-3 h-3 rounded-full bg-white transition-transform duration-300",
                isDark ? "left-6" : "left-1"
              )} />
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
