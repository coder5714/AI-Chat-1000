export interface AIModel {
  id: string;
  name: string;
  description: string;
  geminiModel: string;
  systemInstruction?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  isLoading?: boolean;
}