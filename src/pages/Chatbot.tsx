
import Layout from "@/components/layout/Layout";
import ChatInterface from "@/components/chatbot/ChatInterface";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight } from "lucide-react";

// Awan LLM chatbot ID
const AWAN_CHATBOT_ID = "bcfe4778-79cd-4e9a-8bf5-8e67eda1cf39";

const Chatbot = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="gradient-text">Awan LLM Legal Assistant</span>
            </h1>
            <p className="text-muted-foreground">
              Get instant answers to your legal questions with our AI-powered assistant. For complex matters, 
              we'll connect you with a qualified lawyer.
            </p>
          </div>
          
          {user ? (
            <div className="bg-card rounded-lg shadow-lg border overflow-hidden">
              <ChatInterface chatbotId={AWAN_CHATBOT_ID} />
            </div>
          ) : (
            <div className="bg-card rounded-lg shadow-lg border overflow-hidden">
              <ChatInterface chatbotId={AWAN_CHATBOT_ID} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;
