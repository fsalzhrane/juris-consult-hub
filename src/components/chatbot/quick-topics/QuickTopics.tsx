
import { Scale, FileText, Gavel, Paperclip, Briefcase, Building2, Award, Receipt } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface QuickTopicsProps {
  onSelectTopic: (topic: string) => void;
}

const QuickTopics = ({ onSelectTopic }: QuickTopicsProps) => {
  const topics = [
    { icon: <Scale className="h-4 w-4 mr-1" />, text: "Family Law" },
    { icon: <FileText className="h-4 w-4 mr-1" />, text: "Contracts" },
    { icon: <Gavel className="h-4 w-4 mr-1" />, text: "Criminal Law" },
    { icon: <Paperclip className="h-4 w-4 mr-1" />, text: "Property Law" },
    { icon: <Briefcase className="h-4 w-4 mr-1" />, text: "Employment Law" },
    { icon: <Building2 className="h-4 w-4 mr-1" />, text: "Business Law" },
    { icon: <Award className="h-4 w-4 mr-1" />, text: "Intellectual Property" },
    { icon: <Receipt className="h-4 w-4 mr-1" />, text: "Taxation" },
  ];

  return (
    <div className="px-4 py-2 bg-background border-t flex flex-wrap gap-2">
      {topics.map((topic, index) => (
        <Button 
          key={index}
          variant="outline"
          size="sm"
          className="flex items-center text-xs"
          onClick={() => onSelectTopic(topic.text)}
        >
          {topic.icon}
          {topic.text}
        </Button>
      ))}
    </div>
  );
};

export default QuickTopics;
