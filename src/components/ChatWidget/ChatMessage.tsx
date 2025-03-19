
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export type MessageType = 'user' | 'assistant';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  isStreaming?: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  isLast: boolean;
}

const TypingIndicator = () => (
  <div className="typing-indicator ml-1 inline-flex items-center">
    <span></span>
    <span></span>
    <span></span>
  </div>
);

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLast }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTyping, setShowTyping] = useState(message.isStreaming);
  
  // Auto-scroll to bottom when content changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message.content]);

  // Update typing indicator
  useEffect(() => {
    setShowTyping(message.isStreaming);
  }, [message.isStreaming]);

  const isUser = message.type === 'user';
  
  return (
    <div 
      ref={scrollRef}
      className={cn(
        'mb-4 animate-slide-in flex',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div 
        className={cn(
          'rounded-2xl px-4 py-3 max-w-[85%] shadow-sm transition-all',
          isUser 
            ? 'bg-chat-primary text-white rounded-tr-sm' 
            : 'bg-chat-assistant dark:bg-gray-800 rounded-tl-sm border border-gray-100 dark:border-gray-700'
        )}
      >
        <p className="text-sm">
          <span className="chat-message-stream">{message.content}</span>
          {showTyping && <TypingIndicator />}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
