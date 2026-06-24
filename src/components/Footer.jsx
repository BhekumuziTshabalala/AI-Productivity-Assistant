import { ShieldAlert } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 mt-auto transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <ShieldAlert size={16} className="text-amber-500 dark:text-amber-400" />
        <p>
          <span className="font-semibold text-gray-700 dark:text-gray-300">Responsible AI Disclaimer:</span> AI-generated content may be inaccurate. Please verify all outputs before professional use.
        </p>
      </div>
    </footer>
  );
}
