
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useTranslation } from '@/hooks/useTranslation';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import FAQ from '@/components/contact/FAQ';

const ContactPage = () => {
  const { t } = useTranslation();
  
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
              <ContactForm />
            </div>
            <div>
              <ContactInfo />
            </div>
          </div>

          <FAQ faqs={faqs} />
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
