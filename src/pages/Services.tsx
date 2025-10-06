import { MessageSquare, ShoppingCart, Calendar, Mic, Zap, Clock, BarChart, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      id: "support",
      icon: MessageSquare,
      title: "Customer Support Bot",
      tagline: "Never miss a question",
      problem: "Customer inquiries pile up, leading to frustrated customers and lost sales opportunities.",
      solution: "Our AI support bot provides instant, accurate answers to FAQs, policy questions, and product information 24/7.",
      outcome: "Reduced response times by 90% and increased customer satisfaction scores.",
      features: [
        "Instant FAQ responses",
        "Product information lookup",
        "Policy explanation",
        "Multi-language support",
        "Seamless handoff to human agents",
        "Conversation analytics",
      ],
    },
    {
      id: "sales",
      icon: ShoppingCart,
      title: "Sales & Lead Capture Bot",
      tagline: "Turn clicks into customers",
      problem: "Website visitors leave without engaging, and valuable lead information is lost.",
      solution: "Proactively engage visitors, qualify leads, capture contact information, and schedule sales calls automatically.",
      outcome: "3x increase in lead capture rate and 40% more booked sales calls.",
      features: [
        "Proactive engagement",
        "Lead qualification",
        "Contact capture",
        "Calendar integration",
        "CRM synchronization",
        "Lead scoring",
      ],
    },
    {
      id: "appointment",
      icon: Calendar,
      title: "Appointment & Service Bot",
      tagline: "Simplify scheduling",
      problem: "Phone tag and manual scheduling waste time and lead to booking errors.",
      solution: "Automated booking, rescheduling, and confirmation system that syncs with your calendar.",
      outcome: "35% increase in bookings and 80% reduction in no-shows.",
      features: [
        "24/7 booking availability",
        "Automatic reminders",
        "Easy rescheduling",
        "Calendar sync",
        "Payment integration",
        "Waitlist management",
      ],
    },
    {
      id: "voice",
      icon: Mic,
      title: "Voice & Custom AI Agents",
      tagline: "Let your business talk",
      problem: "Phone calls require constant staffing and important details get missed.",
      solution: "AI voice agents that handle calls naturally, take messages, and provide call summaries.",
      outcome: "Handle 100+ calls simultaneously while maintaining quality.",
      features: [
        "Natural conversation",
        "Call routing",
        "Message taking",
        "Conversation summaries",
        "Multi-language support",
        "Custom workflows",
      ],
    },
  ];

  const commonFeatures = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Average response time under 8 seconds",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Never miss a customer, day or night",
    },
    {
      icon: BarChart,
      title: "Analytics & Insights",
      description: "Track performance and improve over time",
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Enterprise-grade security and privacy",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 gradient-primary">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            AI Services That Drive Results
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-white/90 animate-fade-in">
            Choose from our suite of AI-powered solutions designed to automate your business and delight your customers
          </p>
        </div>
      </section>

      {/* Service Details */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 ${index % 2 === 0 ? "bg-background" : "bg-muted/30"}`}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* Left: Icon & Title */}
                <div className="md:w-1/3">
                  <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mb-6 animate-scale-in">
                    <service.icon className="text-white" size={40} />
                  </div>
                  <h2 className="text-3xl font-bold mb-3">{service.title}</h2>
                  <p className="text-xl text-primary font-semibold mb-8">{service.tagline}</p>
                </div>

                {/* Right: Content */}
                <div className="md:w-2/3 space-y-8">
                  {/* Problem → Solution → Outcome */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-destructive rounded-full"></span>
                        Problem
                      </h3>
                      <p className="text-muted-foreground">{service.problem}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Solution
                      </h3>
                      <p className="text-muted-foreground">{service.solution}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-secondary rounded-full"></span>
                        Outcome
                      </h3>
                      <p className="text-muted-foreground">{service.outcome}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="font-semibold mb-4">Key Features</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="hero" size="lg">
                    Get Started with {service.title}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Common Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Performance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every AI agent comes with these powerful capabilities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {commonFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow animate-fade-in"
              >
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-white" size={28} />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to get started?"
        subtitle="Book a free consultation and discover which AI solution is right for your business"
      />

      <Footer />
    </div>
  );
};

export default Services;
