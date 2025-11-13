import React from 'react';
import type { ChatMessage } from '../types';
import { UserIcon } from './icons/UserIcon';
import { BotIcon } from './icons/BotIcon';
import { CodeBlock } from './CodeBlock';

interface MessageProps {
  message: ChatMessage;
  onSendMessage: (prompt: string) => void;
}

// Informs TypeScript about the global 'marked' variable from the CDN script.
declare var marked: {
  parse(markdownString: string): string;
};

const LoadingIndicator: React.FC = () => (
  <div className="flex items-center space-x-1.5">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
  </div>
);

const renderMessageContent = (content: string, onSendMessage: (prompt: string) => void) => {
    const parts = content.split(/(```(?:\w+)?\n[\s\S]*?\n```)/g);
  
    return parts.map((part, index) => {
      const codeBlockMatch = part.match(/```(\w+)?\n([\s\S]*?)\n```/);
      if (codeBlockMatch) {
        const lang = codeBlockMatch[1] || 'plaintext';
        const code = codeBlockMatch[2].trim();
        return <CodeBlock key={index} code={code} lang={lang} onSendMessage={onSendMessage} />;
      } else if (part.trim()) {
        return (
          <div
            key={index}
            className="prose prose-invert prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: marked.parse(part) }}
          />
        );
      }
      return null;
    });
};

export const Message: React.FC<MessageProps> = ({ message, onSendMessage }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center shrink-0">
          <BotIcon className="w-5 h-5 text-white" />
        </div>
      )}
      <div
        className={`max-w-xl w-full p-4 rounded-2xl break-words ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-lg'
            : 'bg-gray-800 text-gray-200 rounded-bl-lg'
        }`}
      >
        {message.isLoading ? <LoadingIndicator /> : renderMessageContent(message.content, onSendMessage)}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center shrink-0">
          <UserIcon className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};