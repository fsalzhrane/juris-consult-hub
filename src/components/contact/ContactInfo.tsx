
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

const ContactInfo = () => {
  return (
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
  );
};

export default ContactInfo;
