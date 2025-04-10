
import { FormEvent, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Send, CornerDownRight } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;
    
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="border-t p-4 bg-card">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex items-center mr-2 text-muted-foreground">
          <CornerDownRight className="h-4 w-4" />
        </div>
        
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your legal question..."
          className="flex-1 bg-background border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-legal-primary"
          disabled={isLoading}
        />
        
        <Button 
          type="submit" 
          size="icon" 
          disabled={isLoading || !inputValue.trim()} 
          className="bg-legal-primary hover:bg-legal-secondary text-white"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
      
      <div className="mt-2 text-xs text-center text-muted-foreground">
        LawLink Assistant provides general information only, not legal advice. Always consult with a qualified lawyer for your specific situation.
      </div>
    </div>
  );
};

export default ChatInput;
