
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Bot, Send, User, Info, CornerDownRight, Paperclip, FileText, Gavel, Scale } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

// Define message type
interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  title?: string;
  chatbotId?: string;
}

// Default Awan LLM chatbot ID
const DEFAULT_CHATBOT_ID = "bcfe4778-79cd-4e9a-8bf5-8e67eda1cf39";

const ChatInterface = ({ 
  title = "Awan LLM Legal Assistant",
  chatbotId = DEFAULT_CHATBOT_ID
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      content: "Hello! I'm the Awan LLM Legal Assistant. I can provide general legal information and guidance. What legal matter can I help you with today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Save messages to Supabase when they change
  useEffect(() => {
    const saveMessageToDb = async (message: Message) => {
      try {
        await supabase
          .from('chat_messages')
          .insert({
            content: message.content,
            role: message.role,
            chatbot_id: chatbotId,
            user_id: user?.id || null,
            created_at: message.timestamp.toISOString()
          });
      } catch (error) {
        console.error("Error saving message to database:", error);
      }
    };
    
    // Save the most recent message if it's not the initial one
    const lastMessage = messages[messages.length - 1];
    if (messages.length > 1) {
      saveMessageToDb(lastMessage);
    }
  }, [messages, chatbotId, user]);

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      // Format chat history for the API
      const chatHistory = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('legal-chat', {
        body: {
          message: userMessage.content,
          chatHistory: chatHistory,
          chatbotId: chatbotId
        }
      });

      if (error) {
        console.error("Error calling legal-chat function:", error);
        throw error;
      }

      // Add bot message with the response
      const botMessage: Message = {
        role: 'bot',
        content: data.response || "I apologize, but I couldn't process your request at the moment.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("Error in chat handling:", err);
      // Add error bot message
      const botErrorMessage: Message = {
        role: 'bot',
        content: "I apologize for the technical difficulties. Please try again or consult with one of our lawyers for immediate assistance.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botErrorMessage]);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response. Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  function formatTime(date: Date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function handleClearChat() {
    toast({
      title: "Chat cleared",
      description: "All messages have been removed from the chat.",
    });
    
    setMessages([{ 
      role: 'bot', 
      content: "Hello! I'm the Awan LLM Legal Assistant. How can I help you today?",
      timestamp: new Date()
    }]);
  }

  // Quick topic suggestions
  const quickTopics = [
    { icon: <Scale className="h-4 w-4 mr-1" />, text: "Family Law" },
    { icon: <FileText className="h-4 w-4 mr-1" />, text: "Contracts" },
    { icon: <Gavel className="h-4 w-4 mr-1" />, text: "Criminal Law" },
    { icon: <Paperclip className="h-4 w-4 mr-1" />, text: "Property Law" },
  ];

  function handleQuickTopic(topic: string) {
    setInputValue(`Tell me about ${topic.toLowerCase()}`);
  }

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
                      {message.role === 'user' ? 'You' : 'Awan LLM'}
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
                    <span className="text-xs font-medium">Awan LLM</span>
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
      
      {/* Quick topics */}
      <div className="px-4 py-2 bg-background border-t flex flex-wrap gap-2">
        {quickTopics.map((topic, index) => (
          <Button 
            key={index}
            variant="outline"
            size="sm"
            className="flex items-center text-xs"
            onClick={() => handleQuickTopic(topic.text)}
          >
            {topic.icon}
            {topic.text}
          </Button>
        ))}
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
          Awan LLM provides general information only, not legal advice. Always consult with a qualified lawyer for your specific situation.
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
