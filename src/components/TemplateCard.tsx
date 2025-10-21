import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom"; // Import Link

interface TemplateCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: string; // Add link prop
}

const TemplateCard = ({ icon: Icon, title, description, link }: TemplateCardProps) => {
  return (
    <div className="bg-muted/30 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-muted/50 transition-all duration-300 hover:scale-105 animate-scale-in">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="text-primary" size={24} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-2">{title}</h4>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          
            <Button variant="link" className="p-0 h-auto text-sm" asChild>
              <Link to="/templates">
                View Template →
              </Link>
            </Button>
         
          
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;