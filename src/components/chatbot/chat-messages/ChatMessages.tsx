
import { useRef, useEffect } from 'react';
import ChatMessage from '../chat-message/ChatMessage';
import LoadingIndicator from '../loading-indicator/LoadingIndicator';

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-background">
      <div className="space-y-6">
        {messages.map((message, index) => (
          <ChatMessage 
            key={index}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
        
        {/* Loading indicator */}
        {isLoading && <LoadingIndicator timestamp={new Date()} />}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
