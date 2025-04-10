
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "JurisConsult's AI assistant helped me understand my tenant rights in minutes. I followed up with one of their lawyers who resolved my dispute efficiently.",
    author: "Elena Martinez",
    position: "Small Business Owner",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 2,
    content: "As someone dealing with a complex family law case, having 24/7 access to legal information via the AI assistant and then connecting with a specialized lawyer made all the difference.",
    author: "James Wilson",
    position: "Teacher",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 3,
    content: "The scheduling system made it easy to book appointments around my busy work hours. The entire process from initial AI consultation to meeting with my lawyer was seamless.",
    author: "Sophia Nguyen",
    position: "Healthcare Professional",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80"
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-legal text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Client Testimonials</h2>
          <p className="mt-4 text-lg text-white/80">
            Hear from people who have used our platform to solve their legal challenges.
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="min-w-full px-4"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 md:p-10 shadow-lg">
                    <div className="mb-6">
                      <Quote className="h-10 w-10 text-white/50" />
                    </div>
                    <p className="text-lg md:text-xl mb-8">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">{testimonial.author}</h4>
                        <p className="text-sm text-white/70">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:ml-0 bg-white/20 hover:bg-white/30 rounded-full p-2"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:mr-0 bg-white/20 hover:bg-white/30 rounded-full p-2"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
