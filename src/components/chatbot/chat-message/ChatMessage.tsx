
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChatMessage = ({ role, content, timestamp }: ChatMessageProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`flex max-w-[80%] ${
          role === 'user' ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <div className={`flex h-8 w-8 rounded-full items-center justify-center flex-shrink-0 ${
          role === 'user' 
            ? 'bg-legal-primary ml-2' 
            : 'bg-muted mr-2'
        }`}>
          {role === 'user' ? (
            <User className="h-4 w-4 text-white" />
          ) : (
            <Bot className="h-4 w-4 text-legal-primary" />
          )}
        </div>
        
        <div className={`rounded-lg p-4 ${
          role === 'user'
            ? 'bg-legal-primary text-white rounded-tr-none'
            : 'bg-muted rounded-tl-none'
        }`}>
          <div className="flex items-center mb-1">
            <span className="text-xs font-medium">
              {role === 'user' ? 'You' : 'LawLink Assistant'}
            </span>
            <span className="text-xs ml-2 opacity-70">
              {formatTime(timestamp)}
            </span>
          </div>
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
