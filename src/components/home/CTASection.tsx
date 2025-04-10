
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Users } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-legal-primary to-legal-secondary text-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-8 md:p-10">
              <MessageSquare className="h-10 w-10 mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Need Quick Legal Advice?</h3>
              <p className="text-white/80 mb-6">
                Our AI legal assistant is available 24/7 to answer your questions and provide guidance on common legal issues.
              </p>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/chatbot" className="flex items-center">
                  <span>Try AI Assistant</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="bg-card border rounded-lg overflow-hidden shadow-lg">
            <div className="p-8 md:p-10">
              <Users className="h-10 w-10 text-legal-primary mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Connect with a Lawyer</h3>
              <p className="text-muted-foreground mb-6">
                Schedule a consultation with an experienced lawyer specialized in your specific legal matter.
              </p>
              <Button size="lg" className="bg-legal-primary hover:bg-legal-secondary text-white" asChild>
                <Link to="/lawyers" className="flex items-center">
                  <span>Find a Lawyer</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
