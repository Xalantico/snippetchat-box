
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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

interface CardData {
  image: string;
  title: string;
  description: string;
  button: string;
}

const TypingIndicator = () => (
  <div className="typing-indicator ml-1 inline-flex items-center">
    <span></span>
    <span></span>
    <span></span>
  </div>
);

const parseListCards = (content: string): CardData[] | null => {
  if (!content.includes('<list-cards>')) return null;
  
  try {
    const listCardsMatch = content.match(/<list-cards>([\s\S]*?)<\/list-cards>/);
    if (!listCardsMatch) return null;
    
    const listCardsContent = listCardsMatch[1];
    const cardMatches = listCardsContent.match(/<card>([\s\S]*?)<\/card>/g);
    
    if (!cardMatches) return null;
    
    return cardMatches.map(cardString => {
      const imageMatch = cardString.match(/<image>(.*?)<\/image>/);
      const titleMatch = cardString.match(/<title>(.*?)<\/title>/);
      const descriptionMatch = cardString.match(/<description>(.*?)<\/description>/);
      const buttonMatch = cardString.match(/<button>(.*?)<\/button>/);
      
      return {
        image: imageMatch ? imageMatch[1].trim() : '',
        title: titleMatch ? titleMatch[1].trim() : '',
        description: descriptionMatch ? descriptionMatch[1].trim() : '',
        button: buttonMatch ? buttonMatch[1].trim() : ''
      };
    });
  } catch (error) {
    console.error('Error parsing card list:', error);
    return null;
  }
};

const CardList: React.FC<{ cards: CardData[] }> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 gap-4 py-2">
      {cards.map((card, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="relative">
            <AspectRatio ratio={16 / 9}>
              <img 
                src={card.image} 
                alt={card.title}
                className="object-cover w-full h-full rounded-t-md"
              />
            </AspectRatio>
          </div>
          <CardContent className="p-4">
            <CardTitle className="text-lg font-semibold mb-2">{card.title}</CardTitle>
            <CardDescription className="text-sm">{card.description}</CardDescription>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full" size="sm">{card.button}</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLast }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTyping, setShowTyping] = useState(message.isStreaming);
  const cards = parseListCards(message.content);
  
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
  const displayContent = cards ? message.content.replace(/<list-cards>[\s\S]*?<\/list-cards>/, '') : message.content;
  
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
        {displayContent && (
          <p className="text-sm">
            <span className="chat-message-stream">{displayContent}</span>
            {showTyping && <TypingIndicator />}
          </p>
        )}
        
        {cards && !isUser && (
          <div className="mt-3">
            <CardList cards={cards} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
