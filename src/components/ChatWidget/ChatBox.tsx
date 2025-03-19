
import React, { useEffect, useRef } from 'react';
import { Message } from './ChatMessage';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatBoxProps {
  isOpen: boolean;
  messages: Message[];
  onClose: () => void;
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
  className?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  isOpen,
  messages,
  onClose,
  onSendMessage,
  isLoading = false,
  title = 'Chat Support',
  subtitle = 'How can we help you today?',
  className
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className={cn(
        'fixed z-40 rounded-lg shadow-2xl overflow-hidden flex flex-col',
        'chat-window animate-scale-in',
        'border border-gray-200 dark:border-gray-700',
        'w-[90vw] sm:w-[400px] h-[70vh] max-h-[600px]',
        className
      )}
    >
      {/* Header */}
      <div className="bg-chat-primary text-white p-4 flex justify-between items-center">
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-sm opacity-90">{subtitle}</p>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-white/10 transition-colors duration-200"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No messages yet. Start a conversation!
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              isLast={index === messages.length - 1} 
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <ChatInput onSendMessage={onSendMessage} isDisabled={isLoading} />
    </div>
  );
};

export default ChatBox;
