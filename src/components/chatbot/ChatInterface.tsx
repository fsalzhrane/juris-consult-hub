
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Bot, Send, User, Info, CornerDownRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Define message type
interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  title?: string;
}

const ChatInterface = ({ title = "JurisAI Legal Assistant" }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      content: "Hello! I'm JurisAI, your virtual legal assistant. I can provide general legal information and guidance. What legal matter can I help you with today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Mock response examples
  const mockResponses: Record<string, string> = {
    'divorce': "In divorce proceedings, the legal process typically includes filing a petition, serving papers to your spouse, negotiating division of assets and debts, determining child custody/support if applicable, and finalizing through court approval. Each jurisdiction has specific requirements that must be followed. A divorce can be contested or uncontested, with the latter being simpler and less costly. Would you like more specific information about a particular aspect of divorce law?",
    'contract': "A legally binding contract requires several key elements: an offer, acceptance of that offer, consideration (something of value exchanged), legal capacity of the parties involved, and a lawful purpose. Missing elements can render a contract unenforceable. When creating or reviewing contracts, it's important to ensure all terms are clear, all parties fully understand the obligations, and the agreement complies with relevant laws. For complex contracts, consulting with an attorney is always recommended.",
    'tenant': "As a tenant, you generally have rights to habitable living conditions, privacy, proper notice for landlord entry, security deposit protections, and protections against unlawful eviction. Landlords must maintain the property in compliance with health and safety codes, make necessary repairs, and follow proper procedures for lease termination or eviction. Specific tenant rights vary significantly by location, so local and state laws should be consulted for the most accurate information.",
    'employment': "Employment law covers workplace rights and obligations between employers and employees. This includes wage and hour regulations, workplace safety, anti-discrimination protections, family and medical leave, workers' compensation, and wrongful termination. If you believe your rights have been violated, documentation is crucial. Depending on the issue, you may need to file a complaint with a government agency like the Equal Employment Opportunity Commission or consult with an employment lawyer.",
    'copyright': "Copyright protection automatically covers original works of authorship fixed in a tangible medium, including literary, musical, dramatic, artistic, and certain other intellectual works. Registration with the copyright office provides additional legal protections. Copyright infringement occurs when someone uses copyrighted material without permission. Fair use doctrine allows limited use of copyrighted material without permission for purposes such as criticism, comment, news reporting, teaching, scholarship, or research.",
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = { 
      role: 'user', 
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInputValue('');

    // In a real implementation, this would call an API endpoint
    setTimeout(() => {
      let response = "I can provide general legal information, but I'm not a substitute for professional legal advice. For this demo, try asking about 'divorce', 'contract', 'tenant' rights, 'employment' law, or 'copyright'.";
      
      // Check for keywords in the input
      const input = inputValue.toLowerCase();
      for (const [key, value] of Object.entries(mockResponses)) {
        if (input.includes(key)) {
          response = value;
          break;
        }
      }
      
      // Add bot message
      const botMessage: Message = {
        role: 'bot',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleClearChat = () => {
    toast({
      title: "Chat cleared",
      description: "All messages have been removed from the chat.",
    });
    
    setMessages([{ 
      role: 'bot', 
      content: "Hello! I'm JurisAI, your virtual legal assistant. How can I help you today?",
      timestamp: new Date()
    }]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto">
      {/* Chat header */}
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
            onClick={handleClearChat}
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
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-background">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`flex max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className={`flex h-8 w-8 rounded-full items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-legal-primary ml-2' 
                    : 'bg-muted mr-2'
                }`}>
                  {message.role === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-legal-primary" />
                  )}
                </div>
                
                <div className={`rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-legal-primary text-white rounded-tr-none'
                    : 'bg-muted rounded-tl-none'
                }`}>
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-medium">
                      {message.role === 'user' ? 'You' : 'JurisAI'}
                    </span>
                    <span className="text-xs ml-2 opacity-70">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] flex-row">
                <div className="flex h-8 w-8 rounded-full items-center justify-center bg-muted mr-2 flex-shrink-0">
                  <Bot className="h-4 w-4 text-legal-primary" />
                </div>
                
                <div className="rounded-lg p-4 bg-muted rounded-tl-none">
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-medium">JurisAI</span>
                    <span className="text-xs ml-2 opacity-70">{formatTime(new Date())}</span>
                  </div>
                  <div className="flex space-x-1 items-center h-5">
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area */}
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
          JurisAI provides general information only, not legal advice. Always consult with a qualified lawyer for your specific situation.
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
