
import React from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';

export const Header: React.FC = () => {
  // This URL points to the local documentation file.
  const docsUrl = "./docs.md";

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-900/50 shrink-0">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500"></div>
        <h1 className="text-xl font-semibold text-gray-100">Open Source AI Chat Hub</h1>
      </div>
      
      <a 
        href={docsUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        title="View Project Documentation"
        className="p-2 rounded-full text-gray-400 hover:bg-gray-700/50 hover:text-gray-200 transition-colors"
        aria-label="View Project Documentation"
      >
        <BookOpenIcon className="w-5 h-5" />
      </a>
    </header>
  );
};