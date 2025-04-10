
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { StarIcon } from "lucide-react";

// Sample lawyer data without images
const lawyers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    specialty: 'Family Law',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    specialty: 'Corporate Law',
    rating: 4.9,
    reviews: 87
  },
  {
    id: 3,
    name: 'Aisha Patel',
    specialty: 'Criminal Law',
    rating: 4.7,
    reviews: 56
  },
];

const LawyerShowcase = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Top Legal Professionals</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform connects you with experienced lawyers across various legal specialties.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {lawyers.map((lawyer) => (
            <Card 
              key={lawyer.id}
              className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300 card-hover"
            >
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-legal flex items-center justify-center text-white text-2xl font-bold">
                    {lawyer.name.charAt(0)}
                  </div>
                </div>
                <CardTitle className="text-center">{lawyer.name}</CardTitle>
                <CardDescription className="text-center text-legal-primary font-medium">
                  {lawyer.specialty}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(lawyer.rating) ? 'text-yellow-500' : 'text-gray-300'} fill-current`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">{lawyer.rating} ({lawyer.reviews} reviews)</span>
                </div>
                
                <Button className="w-full bg-legal-primary hover:bg-legal-secondary" asChild>
                  <Link to={`/lawyers/${lawyer.id}`}>
                    View Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" size="lg" className="border-legal-primary text-legal-primary hover:bg-legal-primary/10" asChild>
            <Link to="/lawyers">
              View All Lawyers
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LawyerShowcase;
