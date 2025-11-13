import React, { useState, useCallback, useEffect } from 'react';
import { Chat } from '@google/genai';
import { Header } from './components/Header';
import { ModelSelector } from './components/ModelSelector';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import type { ChatMessage, AIModel } from './types';
import { MODELS } from './constants';
import { getChatResponse } from './services/geminiService';
//imports finished!
const App: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<AIModel>(MODELS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [chatInstance, setChatInstance] = useState<Chat | null>(null);

  useEffect(() => {
    setMessages([]);
    setError(null);
    setChatInstance(null); // Reset chat instance when model changes
  }, [selectedModel]);

  const handleSendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim() || isLoading) return;

    setError(null);
    setIsLoading(true);
    const userMessage: ChatMessage = { role: 'user', content: userInput };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    // Add a temporary loading message for the model
    setMessages(prevMessages => [...prevMessages, { role: 'model', content: '...', isLoading: true }]);

    try {
      const { response, chat } = await getChatResponse(chatInstance, selectedModel, userInput);
      setChatInstance(chat); // Update chat instance with history

      const modelMessage: ChatMessage = { role: 'model', content: response };
      
      // Replace the loading message with the actual response
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        const loadingIndex = newMessages.findIndex(msg => msg.isLoading);
        if (loadingIndex !== -1) {
          newMessages[loadingIndex] = modelMessage;
        } else {
          // Fallback in case loading message wasn't found
          newMessages.push(modelMessage);
        }
        return newMessages;
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Error: ${errorMessage}`);
      // Remove loading message on error
      setMessages(prevMessages => prevMessages.filter(msg => !msg.isLoading));
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, selectedModel, chatInstance]);

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-900 text-gray-100">
      <Header />
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        <aside className="w-full md:w-64 lg:w-72 bg-gray-900/50 border-b md:border-b-0 md:border-r border-gray-700/50 p-4 shrink-0">
          <ModelSelector
            models={MODELS}
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
          />
        </aside>
        <main className="flex-1 flex flex-col overflow-hidden">
          <ChatWindow messages={messages} model={selectedModel} onSendMessage={handleSendMessage} />
          {error && <div className="text-red-400 px-4 py-2 text-center text-sm">{error}</div>}
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
};

export default App;