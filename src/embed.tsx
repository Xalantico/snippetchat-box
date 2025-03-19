
import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatWidget from './components/ChatWidget/ChatWidget';
import './index.css';

// Create a function to initialize the chat widget
window.initChatWidget = (config: {
  targetElement?: string;
  title?: string;
  subtitle?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  apiEndpoint?: string;
}) => {
  // Default to body if no target element is specified
  const targetSelector = config.targetElement || 'body';
  const targetElement = document.querySelector(targetSelector);
  
  if (!targetElement) {
    console.error(`Target element "${targetSelector}" not found`);
    return;
  }
  
  // Create a container for the chat widget
  const chatContainer = document.createElement('div');
  chatContainer.id = 'lovable-chat-widget';
  targetElement.appendChild(chatContainer);
  
  // Render the chat widget in the container
  const root = createRoot(chatContainer);
  root.render(
    <React.StrictMode>
      <ChatWidget
        title={config.title}
        subtitle={config.subtitle}
        position={config.position}
        apiEndpoint={config.apiEndpoint}
      />
    </React.StrictMode>
  );
  
  return {
    destroy: () => {
      root.unmount();
      chatContainer.remove();
    }
  };
};

// Auto-initialize if configuration exists
if (window.chatWidgetConfig) {
  window.initChatWidget(window.chatWidgetConfig);
}

// Add TypeScript type definitions
declare global {
  interface Window {
    initChatWidget: typeof initChatWidget;
    chatWidgetConfig?: Parameters<typeof initChatWidget>[0];
  }
}
