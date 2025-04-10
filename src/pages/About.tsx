
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2Icon } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const AboutPage = () => {
  const { t } = useTranslation();

  const values = [
    {
      title: t('about.values.integrity'),
      description: t('about.values.integrityText')
    },
    {
      title: t('about.values.excellence'),
      description: t('about.values.excellenceText')
    },
    {
      title: t('about.values.accessibility'),
      description: t('about.values.accessibilityText')
    },
    {
      title: t('about.values.innovation'),
      description: t('about.values.innovationText')
    }
  ];

  const teamMembers = [
    { name: "Faisal Alzahrani", role: "Team Lead & Developer" },
    { name: "Abdullah Alharbi", role: "UI Designer" },
    { name: "Mohammed Alharthi", role: "Backend Developer" },
    { name: "Saleh Alghamdi", role: "Content Manager" }
  ];

  return (
    <Layout>
      <div className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">{t('about.title')}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">{t('about.mission')}</h2>
              <p className="text-muted-foreground mb-6">
                LawLink is a student project developed for our university course in web application development. 
                Our mission is to create a platform that makes legal services more accessible to everyone through technology.
              </p>
              <div className="bg-legal-primary/10 p-6 rounded-lg">
                <h3 className="font-bold mb-2">Why Choose LawLink?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2Icon className="h-5 w-5 text-legal-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Access to qualified legal professionals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2Icon className="h-5 w-5 text-legal-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Convenient scheduling and consultations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2Icon className="h-5 w-5 text-legal-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Transparent pricing with no hidden fees</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2Icon className="h-5 w-5 text-legal-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Secure and confidential communication</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-legal rounded-lg p-0.5">
              <div className="bg-background rounded-md p-6 h-full">
                <h2 className="text-2xl font-bold mb-6">Our Team</h2>
                <p className="mb-4">
                  We are a group of computer science students from King Abdulaziz University working together to create 
                  this platform as our graduation project. Our team combines technical expertise with a passion for making
                  legal services more accessible through technology.
                </p>
                <p>
                  Founded in 2025, LawLink represents our vision of how technology can bridge the gap between legal 
                  professionals and those in need of their services.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Student Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="card-hover text-center">
                  <CardHeader className="pb-2">
                    <div className="flex justify-center mb-4">
                      <Avatar className="h-20 w-20">
                        <AvatarFallback className="text-lg bg-legal-primary text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">{t('about.ourValues')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="card-hover">
                  <CardHeader>
                    <CardTitle className="text-xl text-center">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
