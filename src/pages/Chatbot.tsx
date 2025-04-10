
import Layout from "@/components/layout/Layout";
import ChatInterface from "@/components/chatbot/ChatInterface";

const Chatbot = () => {
  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="gradient-text">AI Legal Assistant</span>
            </h1>
            <p className="text-muted-foreground">
              Get instant answers to your legal questions with our AI-powered assistant. For complex matters, 
              we'll connect you with a qualified lawyer.
            </p>
          </div>
          
          <div className="bg-card rounded-lg shadow-lg border overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;
