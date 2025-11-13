import React, { useEffect, useRef } from 'react';
import type { ChatMessage, AIModel } from '../types';
import { Message } from './Message';
import { BotIcon } from './icons/BotIcon';

const WelcomeScreen: React.FC<{model: AIModel}> = ({ model }) => (
  <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center mb-4">
      <BotIcon className="w-8 h-8 text-white" />
    </div>
    <h2 className="text-2xl font-semibold text-gray-100">Chat with {model.name}</h2>
    <p className="mt-2 text-gray-400 max-w-md">{model.description}</p>
    <p className="mt-4 text-sm text-gray-500">
      You can start the conversation by typing in the message box below.
    </p>
  </div>
);

interface ChatWindowProps {
  messages: ChatMessage[];
  model: AIModel;
  onSendMessage: (prompt: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, model, onSendMessage }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
       {messages.length === 0 ? (
        <WelcomeScreen model={model} />
      ) : (
        messages.map((msg, index) => (
            <Message key={index} message={msg} onSendMessage={onSendMessage} />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};