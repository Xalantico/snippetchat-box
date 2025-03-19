
import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const ChatButton: React.FC<ChatButtonProps> = ({ isOpen, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform',
        'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        isOpen ? 'bg-gray-200 dark:bg-gray-700' : 'bg-chat-primary text-white',
        className
      )}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      <div className="animate-scale-in">
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </div>
    </button>
  );
};

export default ChatButton;
