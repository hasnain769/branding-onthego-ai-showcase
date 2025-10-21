import { Store, Scissors, Heart, Home, Monitor, Utensils, Briefcase, GraduationCap, ShoppingBag } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import TemplatePreviewModal from "@/components/TempletePreviewModel";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Templates = () => {
  const templates = [
    {
      icon: Store,
      title: "Retail & E-commerce Bot",
      category: "sales",
      description: "Handle product inquiries, track orders, process returns, and capture leads 24/7.",
      features: ["Product catalog integration", "Order tracking", "Returns processing", "Upsell recommendations"],
    },
    {
      icon: Scissors,
      title: "Salon & Spa Booking Bot",
      category: "booking",
      description: "Book appointments, send reminders, manage staff schedules, and handle client preferences.",
      features: ["Online booking", "SMS reminders", "Staff management", "Client profiles"],
    },
    {
      icon: Heart,
      title: "Medical & Clinic Assistant",
      category: "booking",
      description: "Schedule patient appointments, answer common health questions, and send appointment reminders.",
      features: ["HIPAA compliant", "Patient scheduling", "Prescription reminders", "Symptom checker"],
    },
    {
      icon: Home,
      title: "Real Estate Agent Bot",
      category: "sales",
      description: "Qualify leads, schedule property viewings, provide listing information, and follow up automatically.",
      features: ["Lead qualification", "Viewing scheduler", "Property details", "Market updates"],
    },
    {
      icon: Monitor,
      title: "SaaS Support Bot",
      category: "support",
      description: "Support customers, demo features, collect feedback, and route complex issues to your team.",
      features: ["Product demos", "Ticket creation", "Feature requests", "Knowledge base"],
    },
    {
      icon: Utensils,
      title: "Restaurant Reservation Bot",
      category: "booking",
      description: "Take reservations, answer menu questions, handle special requests, and manage waitlists.",
      features: ["Table management", "Menu inquiries", "Special requests", "Waitlist"],
    },
    {
      icon: Briefcase,
      title: "Professional Services Bot",
      category: "support",
      description: "Qualify clients, schedule consultations, explain services, and collect project requirements.",
      features: ["Client intake", "Consultation booking", "Service catalog", "Proposal requests"],
    },
    {
      icon: GraduationCap,
      title: "Education & Training Bot",
      category: "support",
      description: "Answer course questions, manage enrollments, provide student support, and collect feedback.",
      features: ["Course information", "Enrollment", "Student support", "Resource library"],
    },
    {
      icon: ShoppingBag,
      title: "Retail Store Assistant",
      category: "sales",
      description: "Help customers find products, check inventory, provide store hours, and capture feedback.",
      features: ["Product finder", "Inventory check", "Store information", "Customer feedback"],
    },
  ];

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const templateTitle = searchParams.get("template");

  const [filter, setFilter] = useState(category || "all");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (category) {
      setFilter(category);
    }
  }, [category]);

  useEffect(() => {
    if (templateTitle) {
      const templateToPreview = templates.find(t => t.title.toLowerCase().replace(/ /g, '-') === templateTitle);
      if (templateToPreview) {
        handlePreview(templateToPreview);
      }
    }
  }, [templateTitle]);

  const handlePreview = (template: typeof templates[0]) => {
    console.log("Opening preview for:", template.title);
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const categories = [
    { id: "all", label: "All Templates" },
    { id: "sales", label: "Sales & Lead Gen" },
    { id: "support", label: "Customer Support" },
    { id: "booking", label: "Booking & Scheduling" },
  ];

  const filteredTemplates = filter === "all" 
    ? templates 
    : templates.filter(t => t.category === filter);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 gradient-primary">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Ready-to-Deploy AI Templates
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-white/90 animate-fade-in">
            Get started fast with industry-specific AI solutions built for your business
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={filter === category.id ? "hero" : "outline"}
                size="lg"
                onClick={() => setFilter(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              >
                <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mb-6">
                  <template.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">{template.title}</h3>
                <p className="text-muted-foreground mb-6">{template.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="text-sm font-semibold">Key Features:</div>
                  {template.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      {feature}
                    </div>
                  ))}
                </div>
                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={() => handlePreview(template)}
                >
                  Preview Template
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Template CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need something custom?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Don't see a template that fits your needs? We can build a custom AI agent tailored specifically for your business.
            </p>
            <Button variant="hero" size="xl">
              Request Custom Solution
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to launch your AI agent?"
        subtitle="Choose a template and go live in days, not months"
      />

      <TemplatePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        template={selectedTemplate}
      />

      <Footer />
    </div>
  );
};

export default Templates;
