
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bot, Send, User } from 'lucide-react';

const AiChatbotPreview = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'bot', 
      content: 'Hello! I am JurisAI, your legal assistant. How can I help you today?' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock response examples
  const mockResponses = {
    'divorce': "In divorce proceedings, the process typically involves filing a petition, serving papers to your spouse, negotiating terms for asset division, child custody, and support, and finalizing through court approval. Each jurisdiction has specific requirements. Would you like more specific information about divorce laws in your area?",
    'contract': "A legally binding contract requires an offer, acceptance, consideration (something of value exchanged), legal capacity of parties, and lawful purpose. Missing elements may render it unenforceable. For contract review or drafting assistance, I recommend consulting with one of our contract law specialists.",
    'tenant': "Tenant rights vary by location but generally include the right to habitable living conditions, privacy, security deposit protection, and proper notice for entry or eviction. If your landlord is violating these rights, you may have grounds for legal action. Would you like to know more about specific tenant issues?",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    // Add user message
    const userMessage = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInputValue('');

    // Simulate response delay
    setTimeout(() => {
      let response = "I'm designed to provide general legal information. For this demo, try asking about 'divorce', 'contract', or 'tenant' rights.";
      
      // Check for keywords in the input
      const input = inputValue.toLowerCase();
      for (const [key, value] of Object.entries(mockResponses)) {
        if (input.includes(key)) {
          response = value;
          break;
        }
      }
      
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-legal-accent/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-legal-primary/10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">AI Legal Assistant</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Get instant answers to common legal questions with our AI-powered assistant.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">How It Works</h3>
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-legal-primary/20 text-legal-primary">
                  1
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium">Ask Your Question</h4>
                  <p className="text-muted-foreground">Type in your legal query in plain language.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-legal-primary/20 text-legal-primary">
                  2
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium">Get Instant Analysis</h4>
                  <p className="text-muted-foreground">Our AI analyses your question and provides relevant legal information.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-legal-primary/20 text-legal-primary">
                  3
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium">Connect with a Lawyer</h4>
                  <p className="text-muted-foreground">For complex issues, we'll recommend specialized legal counsel.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button size="lg" className="bg-legal-primary hover:bg-legal-secondary" asChild>
                <Link to="/chatbot">Try Full Version</Link>
              </Button>
            </div>
          </div>
          
          <div className="bg-card rounded-lg border shadow-lg overflow-hidden">
            <div className="bg-gradient-legal p-4 flex items-center">
              <Bot className="h-6 w-6 text-white" />
              <h3 className="text-lg font-medium ml-2 text-white">JurisAI Assistant</h3>
            </div>
            <div className="h-96 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-legal-primary text-white rounded-br-none'
                        : 'bg-muted rounded-bl-none'
                    }`}>
                      <div className="flex items-center mb-1">
                        {message.role === 'bot' ? (
                          <>
                            <Bot className="h-4 w-4 mr-1" />
                            <span className="text-xs font-medium">JurisAI</span>
                          </>
                        ) : (
                          <>
                            <User className="h-4 w-4 mr-1" />
                            <span className="text-xs font-medium">You</span>
                          </>
                        )}
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 rounded-bl-none max-w-[80%]">
                      <div className="flex items-center mb-1">
                        <Bot className="h-4 w-4 mr-1" />
                        <span className="text-xs font-medium">JurisAI</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse"></div>
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t p-4">
                <form onSubmit={handleSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about divorce, contracts, or tenant rights..."
                    className="flex-1 border rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-legal-primary"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-legal-primary hover:bg-legal-secondary text-white py-2 px-4 rounded-r-md"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiChatbotPreview;
