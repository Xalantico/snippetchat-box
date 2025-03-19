
import React, { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatButton from './ChatButton';
import ChatBox from './ChatBox';
import { Message } from './ChatMessage';
import { useChatStream } from '@/hooks/useChatStream';
import { cn } from '@/lib/utils';

export interface ChatWidgetProps {
  title?: string;
  subtitle?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  apiEndpoint?: string;
  initialMessages?: Message[];
  buttonClassName?: string;
  chatBoxClassName?: string;
}

const positionClasses = {
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
};

const ChatWidget: React.FC<ChatWidgetProps> = ({ 
  title = 'Chat Support',
  subtitle = 'How can we help you today?',
  position = 'bottom-right',
  apiEndpoint = '/api/chat',
  initialMessages = [],
  buttonClassName,
  chatBoxClassName
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  
  const { 
    streamMessage, 
    isStreaming, 
    currentStreamingId,
    cancelStream
  } = useChatStream({
    apiEndpoint,
    onStreamComplete: (messageId) => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, isStreaming: false } : msg
        )
      );
    }
  });

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleSendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessageId = uuidv4();
    const userMessage: Message = {
      id: userMessageId,
      type: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Add initial assistant message with streaming indicator
    const assistantMessageId = uuidv4();
    const assistantMessage: Message = {
      id: assistantMessageId,
      type: 'assistant',
      content: '',
      isStreaming: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    
    // Start streaming response
    try {
      await streamMessage(content, assistantMessageId, (chunk) => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMessageId 
              ? { ...msg, content: msg.content + chunk } 
              : msg
          )
        );
      });
    } catch (error) {
      console.error('Error streaming message:', error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessageId 
            ? { 
                ...msg, 
                content: 'Sorry, there was an error processing your request. Please try again.',
                isStreaming: false 
              } 
            : msg
        )
      );
    }
  }, [streamMessage]);

  // Close chat on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Cancel streaming if chat is closed
  useEffect(() => {
    if (!isOpen && isStreaming) {
      cancelStream();
      // Update message to show streaming was interrupted
      if (currentStreamingId) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === currentStreamingId 
              ? { ...msg, isStreaming: false } 
              : msg
          )
        );
      }
    }
  }, [isOpen, isStreaming, cancelStream, currentStreamingId]);

  return (
    <>
      <ChatButton 
        isOpen={isOpen} 
        onClick={toggleChat} 
        className={cn(positionClasses[position], buttonClassName)}
      />
      
      <ChatBox 
        isOpen={isOpen}
        messages={messages}
        onClose={() => setIsOpen(false)}
        onSendMessage={handleSendMessage}
        isLoading={isStreaming}
        title={title}
        subtitle={subtitle}
        className={cn(positionClasses[position], chatBoxClassName)}
      />
    </>
  );
};

export default ChatWidget;
