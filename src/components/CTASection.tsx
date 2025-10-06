import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface CTASectionProps {
  title: string;
  subtitle: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryText?: string;
}

const CTASection = ({
  title,
  subtitle,
  primaryButtonText = "Book a Free Strategy Call",
  primaryButtonLink = "/contact",
  secondaryText,
}: CTASectionProps) => {
  return (
    <section className="py-20 gradient-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
          {title}
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <Button variant="outline-white" size="xl" asChild>
            <Link to={primaryButtonLink}>{primaryButtonText}</Link>
          </Button>
        </div>
        {secondaryText && (
          <p className="text-sm text-white/70 mt-6 animate-fade-in">{secondaryText}</p>
        )}
      </div>
    </section>
  );
};

export default CTASection;
