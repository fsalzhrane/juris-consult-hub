
import { Button } from "@/components/ui/button";
import { Bot, Info } from 'lucide-react';

interface ChatHeaderProps {
  title: string;
  onClearChat: () => void;
}

const ChatHeader = ({ title, onClearChat }: ChatHeaderProps) => {
  return (
    <div className="bg-gradient-legal p-4 flex items-center justify-between rounded-t-lg">
      <div className="flex items-center">
        <Bot className="h-6 w-6 text-white" />
        <h2 className="text-lg font-medium ml-2 text-white">{title}</h2>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-white/10"
          onClick={onClearChat}
        >
          Clear Chat
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-white/10"
        >
          <Info className="h-4 w-4" />
          <span className="ml-1">Help</span>
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
