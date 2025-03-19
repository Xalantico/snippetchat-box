
import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isDisabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isDisabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() && !isDisabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t dark:border-gray-700 bg-white dark:bg-gray-900 p-4 rounded-b-lg">
      <div className="relative flex items-center">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={isDisabled}
          className={cn(
            "w-full p-3 pr-12 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "placeholder:text-gray-500 dark:placeholder:text-gray-400 dark:bg-gray-800 resize-none overflow-hidden",
            "transition-all duration-200",
            "min-h-[44px] max-h-[120px]",
            isDisabled && "opacity-50 cursor-not-allowed"
          )}
          rows={1}
          style={{
            height: 'auto',
            minHeight: '44px',
            maxHeight: '120px'
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={!message.trim() || isDisabled}
          className={cn(
            "absolute right-3 p-1.5 rounded-md",
            "text-chat-primary hover:bg-gray-100 dark:hover:bg-gray-700",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            (!message.trim() || isDisabled) && "opacity-50 cursor-not-allowed"
          )}
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
