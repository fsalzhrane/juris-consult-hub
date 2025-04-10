
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ChatHeader from './chat-header/ChatHeader';
import ChatMessages from './chat-messages/ChatMessages';
import QuickTopics from './quick-topics/QuickTopics';
import ChatInput from './chat-input/ChatInput';

// Define message type
interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  title?: string;
}

const ChatInterface = ({ title = "LawLink Legal Assistant" }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      content: "Hello! I'm the LawLink Legal Assistant. I can provide general legal information and guidance. What legal matter can I help you with today?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (inputValue: string) => {
    if (!inputValue.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = { 
      role: 'user', 
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Format chat history for the API
      const chatHistory = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      // Call the Supabase edge function
      const { data, error } = await supabase.functions.invoke('legal-chat', {
        body: {
          message: userMessage.content,
          chatHistory: chatHistory
        }
      });

      if (error) {
        console.error("Error calling legal-chat function:", error);
        
        // Add error bot message with a user-friendly response
        const botErrorMessage: Message = {
          role: 'bot',
          content: "I'm currently experiencing technical difficulties. Please try again in a moment, or consider contacting one of our lawyers directly for immediate assistance.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botErrorMessage]);
      } else {
        // Add bot message with the AI response
        const botMessage: Message = {
          role: 'bot',
          content: data.response || "I'm sorry, I couldn't generate a response. Please try again.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (err) {
      console.error("Exception in chat submission:", err);
      // Add error bot message
      const botErrorMessage: Message = {
        role: 'bot',
        content: "I apologize for the inconvenience. Our service is currently experiencing high demand. Please try again shortly or consider scheduling a consultation with one of our lawyers.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    toast({
      title: "Chat cleared",
      description: "All messages have been removed from the chat.",
    });
    
    setMessages([{ 
      role: 'bot', 
      content: "Hello! I'm the LawLink Legal Assistant. How can I help you today?",
      timestamp: new Date()
    }]);
  };

  const handleQuickTopic = (topic: string) => {
    handleSubmit(`Tell me about ${topic.toLowerCase()}`);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto">
      <ChatHeader title={title} onClearChat={handleClearChat} />
      <ChatMessages messages={messages} isLoading={isLoading} />
      <QuickTopics onSelectTopic={handleQuickTopic} />
      <ChatInput onSendMessage={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
