
import Layout from "@/components/layout/Layout";
import ChatInterface from "@/components/chatbot/ChatInterface";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight } from "lucide-react";

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
              <span className="gradient-text">LawLink AI Legal Assistant</span>
            </h1>
            <p className="text-muted-foreground">
              Get instant answers to your legal questions with our AI-powered assistant. For complex matters, 
              we'll connect you with a qualified lawyer.
            </p>
          </div>
          
          {user ? (
            <div className="bg-card rounded-lg shadow-lg border overflow-hidden">
              <ChatInterface />
            </div>
          ) : (
            <div className="bg-card rounded-lg shadow-lg border p-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-legal-primary" />
              <h2 className="text-2xl font-bold mb-2">Sign In to Access the Legal Assistant</h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Our AI Legal Assistant is available to registered users. Sign in or create an account to get instant answers to your legal questions.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  className="bg-legal-primary hover:bg-legal-secondary text-white"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/register")}
                >
                  Create an Account
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;
