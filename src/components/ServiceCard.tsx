import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: string;
}

const ServiceCard = ({ icon: Icon, title, description, link }: ServiceCardProps) => {
  const content = (
    <>
      <div className="mb-6 w-14 h-14 gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon className="text-white" size={28} />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
      {link && (
        <Button variant="link" className="p-0 h-auto">
          Learn More →
        </Button>
      )}
    </>
  );

  return link ? (
    <Link href={link} className="group bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in block">
      {content}
    </Link>
  ) : (
    <div className="group bg-card border border-border rounded-2xl p-8 transition-all duration-300 animate-fade-in">
      {content}
    </div>
  );
};

export default ServiceCard;