# Open Source AI Chat Hub - Documentation

## 1. Overview

Welcome to the Open Source AI Chat Hub! This application is an elegant and powerful chat interface designed to let you interact with a variety of open-source AI models, all simulated and powered by the Google Gemini API. It's a versatile tool for general conversation, brainstorming, and a powerful assistant for software development.

## 2. Features

### Core Chat Functionality
- **Model Selection**: Easily switch between different AI personas, including general-purpose models like Llama 3 and specialized ones like Code Llama.
- **Persistent Conversation**: The chat history is maintained for the current session, allowing for contextual follow-up questions with the selected model.
- **Markdown Rendering**: Responses from the AI are rendered as Markdown, correctly formatting lists, bold/italic text, and especially code blocks.
- **Loading & Error States**: A clean user interface provides feedback when the AI is "thinking" or if an error occurs.

### Coding Assistant Features (for Code Llama)
When the "Code Llama 70B" model is selected, any code block in its response will include a powerful toolbar with the following actions:

- **Generate Documentation**: Automatically sends the code back to the AI with a prompt to generate detailed documentation for it. The documentation appears as a new message in the chat.
- **Deploy to GitHub Gist**: Instantly creates a new public, anonymous Gist on GitHub with the code from the block. A new tab will open with the Gist URL.
- **Download as .zip**: Packages the code block into a `.zip` file and initiates a download. The file is correctly named with the appropriate language extension (e.g., `code.js`, `code.py`).
- **Live Web Preview**: For HTML code, this button opens a new tab with a live, rendered preview of the code. This allows you to instantly test and see frontend code in action.
- **Syntax Highlighting**: All code is beautifully highlighted using the popular Atom One Dark theme for maximum readability.

## 3. How to Use

1.  **Select a Model**: On the left-hand sidebar, click on the AI model you wish to chat with. Each model has a brief description of its strengths.
2.  **Start Chatting**: Type your message in the input box at the bottom and press Enter or click the send button.
3.  **Use Coding Tools**: If you ask the Code Llama model for code, hover over the resulting code block to reveal the toolbar on the top right. Click the desired icon to perform an action.

## 4. Technology Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **AI Backend**: Google Gemini API (`@google/genai`)
- **Markdown Parsing**: `marked.js`
- **Code Syntax Highlighting**: `highlight.js`
- **ZIP File Generation**: `JSZip`
