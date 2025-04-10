
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GavelIcon, FileText, BookOpen, Scale, MessageCircle, FilePenLine } from 'lucide-react';

const ServicesPage = () => {
  const { t } = useTranslation();

  const services = [
    { 
      icon: <GavelIcon className="h-10 w-10 text-legal-primary" />,
      title: t('home.services.legalConsultation'),
      description: 'Get expert advice on legal matters from our qualified professionals.'
    },
    { 
      icon: <FileText className="h-10 w-10 text-legal-primary" />,
      title: t('home.services.documentReview'), 
      description: 'Have your legal documents reviewed and verified by our professionals.'
    },
    { 
      icon: <BookOpen className="h-10 w-10 text-legal-primary" />,
      title: t('home.services.legalResearch'),
      description: 'Thorough research on legal matters to support your case.'
    },
    { 
      icon: <Scale className="h-10 w-10 text-legal-primary" />,
      title: t('home.services.disputeResolution'),
      description: 'Mediation and arbitration services to resolve legal disputes.'
    },
    { 
      icon: <MessageCircle className="h-10 w-10 text-legal-primary" />,
      title: t('home.services.legalAdvice'),
      description: 'Personalized legal advice tailored to your specific situation.'
    },
    { 
      icon: <FilePenLine className="h-10 w-10 text-legal-primary" />,
      title: t('home.services.contractDrafting'),
      description: 'Professional drafting of contracts and legal agreements.'
    }
  ];

  return (
    <Layout>
      <div className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">{t('services.title')}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl text-center">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServicesPage;
