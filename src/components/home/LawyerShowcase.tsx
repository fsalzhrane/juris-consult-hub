
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample lawyer data
const lawyers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    specialty: 'Family Law',
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    specialty: 'Corporate Law',
    rating: 4.9,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 3,
    name: 'Aisha Patel',
    specialty: 'Criminal Law',
    rating: 4.7,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
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
            <div 
              key={lawyer.id}
              className="bg-card rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300 card-hover"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img 
                  src={lawyer.image} 
                  alt={lawyer.name} 
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium">{lawyer.name}</h3>
                <p className="text-legal-primary font-medium mb-2">{lawyer.specialty}</p>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {Array(5).fill(0).map((_, i) => (
                      <svg 
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(lawyer.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">{lawyer.rating} ({lawyer.reviews} reviews)</span>
                </div>
                
                <Button className="w-full bg-legal-primary hover:bg-legal-secondary" asChild>
                  <Link to={`/lawyers/${lawyer.id}`}>
                    View Profile
                  </Link>
                </Button>
              </div>
            </div>
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
