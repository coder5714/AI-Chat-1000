import React, { useEffect, useRef, useState } from 'react';
import { GitHubIcon } from './icons/GitHubIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { GlobeIcon } from './icons/GlobeIcon';
import { DocumentIcon } from './icons/DocumentIcon';

// Inform TypeScript about global variables from CDNs
declare var hljs: any;
declare var JSZip: any;

interface CodeBlockProps {
  code: string;
  lang: string;
  onSendMessage: (prompt: string) => void;
}

const langToFileExtension: { [key: string]: string } = {
  javascript: 'js',
  python: 'py',
  typescript: 'ts',
  html: 'html',
  css: 'css',
  java: 'java',
  csharp: 'cs',
  cpp: 'cpp',
  go: 'go',
  ruby: 'rb',
  php: 'php',
  swift: 'swift',
  kotlin: 'kt',
  rust: 'rs',
  shell: 'sh',
  json: 'json',
  yaml: 'yaml',
  markdown: 'md',
};

const WEB_LANGS = ['html', 'javascript', 'css'];

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, lang, onSendMessage }) => {
  const codeRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  const getFileExtension = () => langToFileExtension[lang] || 'txt';
  const getFileName = () => `code.${getFileExtension()}`;
  const isWebLang = WEB_LANGS.includes(lang);

  const handleDownloadZip = () => {
    const zip = new JSZip();
    zip.file(getFileName(), code);
    zip.generateAsync({ type: 'blob' }).then((content: Blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'code.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleDeployGist = async () => {
    try {
      const response = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: 'Code Gist from Open Source AI Chat Hub',
          public: true,
          files: {
            [getFileName()]: {
              content: code,
            },
          },
        }),
      });
      const data = await response.json();
      if (data.html_url) {
        window.open(data.html_url, '_blank');
      } else {
        throw new Error('Failed to create Gist.');
      }
    } catch (error) {
      console.error('Gist creation failed:', error);
      alert('Could not create GitHub Gist.');
    }
  };

  const handleWebPreview = () => {
    if (lang !== 'html') {
        alert('Web preview is only available for HTML code blocks.');
        return;
    }
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };
  
  const handleGenerateDocs = () => {
    const prompt = `Please generate comprehensive documentation for the following ${lang} code snippet. Explain its purpose, parameters, and return values (if any), and provide a clear usage example.

\`\`\`${lang}
${code}
\`\`\``;
    onSendMessage(prompt);
  };

  return (
    <div 
        className="relative my-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute top-2 right-2 flex items-center space-x-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button onClick={handleGenerateDocs} title="Generate Documentation" className="p-1.5 bg-gray-900/50 rounded-md hover:bg-gray-700/50">
            <DocumentIcon className="w-4 h-4 text-gray-300" />
        </button>
        {isWebLang && (
            <button onClick={handleWebPreview} title="Preview Website" className="p-1.5 bg-gray-900/50 rounded-md hover:bg-gray-700/50">
                <GlobeIcon className="w-4 h-4 text-gray-300" />
            </button>
        )}
        <button onClick={handleDeployGist} title="Deploy to GitHub Gist" className="p-1.5 bg-gray-900/50 rounded-md hover:bg-gray-700/50">
          <GitHubIcon className="w-4 h-4 text-gray-300" />
        </button>
        <button onClick={handleDownloadZip} title="Download as .zip" className="p-1.5 bg-gray-900/50 rounded-md hover:bg-gray-700/50">
          <DownloadIcon className="w-4 h-4 text-gray-300" />
        </button>
      </div>
      <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm">
        <code ref={codeRef} className={`language-${lang}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};