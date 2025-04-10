
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Calendar, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-legal-dark to-legal-dark/90 text-white py-20 md:py-32 overflow-hidden">
      {/* Background shapes/pattern */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-legal-primary/10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-legal-secondary/10 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Expert Legal Advice At Your Fingertips
              </h1>
              <p className="mt-6 text-lg text-gray-300 max-w-xl">
                Connect with top legal professionals or get instant answers from our AI legal assistant. Justice made accessible.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-legal-primary hover:bg-legal-secondary text-white" asChild>
                <Link to="/register">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/chatbot">
                  Try AI Assistant
                  <MessageSquare className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden md:flex justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-legal-primary to-legal-secondary rounded-lg transform rotate-3 blur-sm"></div>
              <div className="relative bg-card border rounded-lg shadow-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-legal-primary">Legal Consultation</h3>
                    <div className="bg-legal-accent/30 text-legal-primary px-2 py-1 rounded-full text-xs font-medium">
                      Featured Service
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-legal-accent/30 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5 text-legal-primary" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-foreground">AI Legal Assistant</h4>
                        <p className="text-sm text-muted-foreground">Get instant answers to common legal questions</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-legal-accent/30 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-legal-primary" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-foreground">Book a Lawyer</h4>
                        <p className="text-sm text-muted-foreground">Schedule consultations with expert lawyers</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-legal-accent/30 p-2 rounded-full">
                        <Shield className="h-5 w-5 text-legal-primary" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-foreground">Secure & Confidential</h4>
                        <p className="text-sm text-muted-foreground">Your data is always protected</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6 bg-legal-primary hover:bg-legal-secondary text-white">
                    Explore Services
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
