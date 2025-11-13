
import React from 'react';
import type { AIModel } from '../types';

interface ModelSelectorProps {
  models: AIModel[];
  selectedModel: AIModel;
  onSelectModel: (model: AIModel) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ models, selectedModel, onSelectModel }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-200">Select a Model</h2>
      <div className="space-y-2">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => onSelectModel(model)}
            className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
              selectedModel.id === model.id
                ? 'bg-blue-600/30 text-white'
                : 'bg-gray-800/50 hover:bg-gray-700/50'
            }`}
          >
            <p className="font-medium">{model.name}</p>
            <p className="text-xs text-gray-400 mt-1">{model.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
