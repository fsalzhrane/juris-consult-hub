
import { Bot } from 'lucide-react';

interface LoadingIndicatorProps {
  timestamp: Date;
}

const LoadingIndicator = ({ timestamp }: LoadingIndicatorProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex justify-start">
      <div className="flex max-w-[80%] flex-row">
        <div className="flex h-8 w-8 rounded-full items-center justify-center bg-muted mr-2 flex-shrink-0">
          <Bot className="h-4 w-4 text-legal-primary" />
        </div>
        
        <div className="rounded-lg p-4 bg-muted rounded-tl-none">
          <div className="flex items-center mb-1">
            <span className="text-xs font-medium">LawLink Assistant</span>
            <span className="text-xs ml-2 opacity-70">{formatTime(timestamp)}</span>
          </div>
          <div className="flex space-x-1 items-center h-5">
            <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse"></div>
            <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
            <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
