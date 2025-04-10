
import { 
  MessageSquare, 
  Calendar, 
  Users, 
  CreditCard, 
  Shield, 
  Star
} from 'lucide-react';

const features = [
  {
    icon: <MessageSquare className="h-6 w-6 text-legal-primary" />,
    title: 'AI Legal Assistant',
    description: 'Get instant answers to common legal questions using our advanced AI powered by GPT technology.'
  },
  {
    icon: <Calendar className="h-6 w-6 text-legal-primary" />,
    title: 'Easy Scheduling',
    description: 'Book consultations with lawyers at your convenience using our intuitive scheduling system.'
  },
  {
    icon: <Users className="h-6 w-6 text-legal-primary" />,
    title: 'Expert Lawyers',
    description: 'Connect with qualified and experienced legal professionals across various specializations.'
  },
  {
    icon: <CreditCard className="h-6 w-6 text-legal-primary" />,
    title: 'Secure Payments',
    description: 'Process payments securely and efficiently through our integrated payment system.'
  },
  {
    icon: <Shield className="h-6 w-6 text-legal-primary" />,
    title: 'Data Protection',
    description: 'Your information is encrypted and protected following GDPR and industry security standards.'
  },
  {
    icon: <Star className="h-6 w-6 text-legal-primary" />,
    title: 'Feedback & Ratings',
    description: 'Leave reviews and ratings after consultations to help others find the best legal advice.'
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Comprehensive Legal Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform offers a range of features designed to make legal consultations accessible, efficient, and secure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="bg-legal-accent/30 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
