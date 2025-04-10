
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ContactPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const faqs = [
    {
      question: "What legal services does LawLink offer?",
      answer: "LawLink connects clients with lawyers specializing in various fields including family law, corporate law, criminal law, property law, immigration, and more."
    },
    {
      question: "How do I schedule a consultation with a lawyer?",
      answer: "To schedule a consultation, create an account, browse available lawyers, select one that matches your needs, and book an appointment through their profile page."
    },
    {
      question: "What are the consultation fees?",
      answer: "Consultation fees vary by lawyer and their specialization. Each lawyer's profile displays their fee structure, and many offer free initial consultations."
    },
    {
      question: "Is my information kept confidential?",
      answer: "Yes, all communications and information shared on LawLink are protected by strict confidentiality policies and industry-standard encryption to ensure your privacy."
    },
    {
      question: "Can I use the AI assistant for legal advice?",
      answer: "Our AI assistant provides general information about legal procedures and concepts, but it is not a substitute for personalized legal advice from a qualified lawyer."
    },
    {
      question: "How do I cancel or reschedule an appointment?",
      answer: "You can cancel or reschedule appointments through your dashboard up to 24 hours before the scheduled time without any penalty."
    }
  ];

  return (
    <Layout>
      <div className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Have questions or need assistance? Get in touch with our team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        rows={6}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-legal-primary hover:bg-legal-secondary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-legal-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">Address</h3>
                        <p className="text-muted-foreground">Saudi Arabia, Jeddah, Al Manar Street</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-legal-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-muted-foreground">fsalzhrane@gmail.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-legal-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-muted-foreground">0545128183</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-legal-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">Support Hours</h3>
                        <p className="text-muted-foreground">Sunday - Thursday: 9am - 5pm</p>
                        <p className="text-muted-foreground">Friday - Saturday: Closed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
