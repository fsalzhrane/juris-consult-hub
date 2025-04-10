
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Star, 
  Clock, 
  Filter, 
  X 
} from "lucide-react";

// Sample lawyer data
const lawyersData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    specialty: 'Family Law',
    location: 'New York, NY',
    rating: 4.8,
    reviews: 124,
    experience: '8 years',
    availability: 'Available Today',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    specialty: 'Corporate Law',
    location: 'Los Angeles, CA',
    rating: 4.9,
    reviews: 87,
    experience: '12 years',
    availability: 'Available Tomorrow',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 3,
    name: 'Aisha Patel',
    specialty: 'Criminal Law',
    location: 'Chicago, IL',
    rating: 4.7,
    reviews: 56,
    experience: '6 years',
    availability: 'Available Next Week',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 4,
    name: 'David Chen',
    specialty: 'Intellectual Property',
    location: 'San Francisco, CA',
    rating: 4.9,
    reviews: 92,
    experience: '10 years',
    availability: 'Available Today',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 5,
    name: 'Jennifer Lewis',
    specialty: 'Employment Law',
    location: 'Boston, MA',
    rating: 4.6,
    reviews: 78,
    experience: '9 years',
    availability: 'Available Tomorrow',
    image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 6,
    name: 'Robert Washington',
    specialty: 'Real Estate Law',
    location: 'Dallas, TX',
    rating: 4.8,
    reviews: 104,
    experience: '15 years',
    availability: 'Available Today',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
];

// Specialty options
const specialtyOptions = [
  'All Specialties',
  'Family Law',
  'Corporate Law',
  'Criminal Law',
  'Intellectual Property',
  'Employment Law',
  'Real Estate Law',
];

// Availability options
const availabilityOptions = [
  'Any Time',
  'Available Today',
  'Available Tomorrow',
  'Available This Week',
];

const Lawyers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedAvailability, setSelectedAvailability] = useState('Any Time');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  // Filter lawyers based on search term and filters
  const filteredLawyers = lawyersData.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         lawyer.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.location.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || lawyer.specialty === selectedSpecialty;
    
    const matchesAvailability = selectedAvailability === 'Any Time' || 
                               (selectedAvailability === 'Available Today' && lawyer.availability === 'Available Today') ||
                               (selectedAvailability === 'Available Tomorrow' && 
                                (lawyer.availability === 'Available Today' || lawyer.availability === 'Available Tomorrow')) ||
                               (selectedAvailability === 'Available This Week' && 
                                lawyer.availability !== 'Available Next Week');
                                
    return matchesSearch && matchesSpecialty && matchesAvailability;
  });
  
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="gradient-text">Find a Lawyer</span>
            </h1>
            <p className="text-muted-foreground">
              Connect with experienced legal professionals for personalized consultation and guidance.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Search by name, specialty, or location" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="md:hidden">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                  onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
              
              <div className="hidden md:flex gap-4">
                <select 
                  className="px-3 py-2 bg-card border rounded-md focus:outline-none focus:ring-2 focus:ring-legal-primary"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  {specialtyOptions.map((specialty) => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
                
                <select 
                  className="px-3 py-2 bg-card border rounded-md focus:outline-none focus:ring-2 focus:ring-legal-primary"
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                >
                  {availabilityOptions.map((availability) => (
                    <option key={availability} value={availability}>{availability}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Mobile Filters */}
            {isFilterMenuOpen && (
              <div className="md:hidden p-4 bg-card rounded-lg border shadow-sm animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filters</h3>
                  <button onClick={() => setIsFilterMenuOpen(false)}>
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Specialty</label>
                    <select 
                      className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-legal-primary"
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                    >
                      {specialtyOptions.map((specialty) => (
                        <option key={specialty} value={specialty}>{specialty}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Availability</label>
                    <select 
                      className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-legal-primary"
                      value={selectedAvailability}
                      onChange={(e) => setSelectedAvailability(e.target.value)}
                    >
                      {availabilityOptions.map((availability) => (
                        <option key={availability} value={availability}>{availability}</option>
                      ))}
                    </select>
                  </div>
                  
                  <Button 
                    className="w-full bg-legal-primary hover:bg-legal-secondary"
                    onClick={() => setIsFilterMenuOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
            
            {/* Active filters */}
            {(selectedSpecialty !== 'All Specialties' || selectedAvailability !== 'Any Time') && (
              <div className="flex flex-wrap gap-2">
                {selectedSpecialty !== 'All Specialties' && (
                  <div className="bg-legal-accent/30 text-legal-primary px-3 py-1 rounded-full text-sm flex items-center">
                    {selectedSpecialty}
                    <button 
                      onClick={() => setSelectedSpecialty('All Specialties')}
                      className="ml-1 h-4 w-4 rounded-full bg-legal-primary/20 flex items-center justify-center"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {selectedAvailability !== 'Any Time' && (
                  <div className="bg-legal-accent/30 text-legal-primary px-3 py-1 rounded-full text-sm flex items-center">
                    {selectedAvailability}
                    <button 
                      onClick={() => setSelectedAvailability('Any Time')}
                      className="ml-1 h-4 w-4 rounded-full bg-legal-primary/20 flex items-center justify-center"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {(selectedSpecialty !== 'All Specialties' || selectedAvailability !== 'Any Time') && (
                  <button 
                    onClick={() => {
                      setSelectedSpecialty('All Specialties');
                      setSelectedAvailability('Any Time');
                    }}
                    className="text-sm text-muted-foreground hover:text-legal-primary"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
          
          {/* Results count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredLawyers.length} {filteredLawyers.length === 1 ? 'lawyer' : 'lawyers'}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
          
          {/* Lawyers grid */}
          {filteredLawyers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLawyers.map((lawyer) => (
                <div 
                  key={lawyer.id}
                  className="bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 card-hover"
                >
                  <div className="flex items-center p-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                      <img 
                        src={lawyer.image} 
                        alt={lawyer.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-lg">{lawyer.name}</h3>
                      <p className="text-legal-primary text-sm">{lawyer.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-4">
                    <div className="flex items-center text-sm mb-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                      <span>{lawyer.location}</span>
                    </div>
                    
                    <div className="flex items-center text-sm mb-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground mr-1" />
                      <span>{lawyer.experience} experience</span>
                    </div>
                    
                    <div className="flex items-center text-sm mb-2">
                      <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className={`${
                        lawyer.availability === 'Available Today' ? 'text-green-600' : ''
                      }`}>
                        {lawyer.availability}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm mb-4">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{lawyer.rating} ({lawyer.reviews} reviews)</span>
                    </div>
                    
                    <Button className="w-full bg-legal-primary hover:bg-legal-secondary">
                      Book Consultation
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium mb-2">No lawyers found</h3>
              <p className="text-muted-foreground mb-4">
                We couldn't find any lawyers matching your criteria. Try adjusting your filters.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty('All Specialties');
                  setSelectedAvailability('Any Time');
                }}
              >
                Clear Search & Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Lawyers;
