import { PhoneCall, ShoppingCart, Calendar, Mic, Zap, Clock, BarChart, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      id: "voice",
      icon: Mic,
      title: "AI Voice Agents",
      tagline: "Your 24/7 phone team",
      problem: "Missing phone calls means losing customers. Staffing a phone line 24/7 is expensive and inconsistent.",
      solution: "AI voice agents that sound human, understand context, and handle unlimited calls simultaneously with natural conversation.",
      outcome: "Handle 100+ calls simultaneously with 95% customer satisfaction and zero missed opportunities.",
      features: [
        "Human-like natural conversation",
        "24/7 availability, no breaks",
        "Instant call answering",
        "Multi-language support",
        "Conversation intelligence & analytics",
        "Seamless CRM integration",
      ],
    },
    {
      id: "inbound",
      icon: PhoneCall,
      title: "Inbound Call Automation",
      tagline: "Answer every call instantly",
      problem: "Customers hang up when calls aren't answered immediately, leading to lost revenue and poor experience.",
      solution: "AI voice agents answer every inbound call in under 2 seconds, route intelligently, or handle requests completely.",
      outcome: "Zero missed calls, 90% reduction in hold times, and 3x increase in phone-driven conversions.",
      features: [
        "Instant call pickup (<2s)",
        "Intelligent call routing",
        "FAQ answering over phone",
        "Call summaries & transcripts",
        "After-hours coverage",
        "Voicemail transcription",
      ],
    },
    {
      id: "appointment",
      icon: Calendar,
      title: "Appointment Scheduling Voice Bots",
      tagline: "Book appointments by voice",
      problem: "Manual appointment booking over the phone is time-consuming and error-prone, leading to scheduling conflicts.",
      solution: "Voice AI that handles booking, rescheduling, and confirmations via phone calls with natural conversation.",
      outcome: "35% increase in bookings, 80% reduction in no-shows, and staff freed for higher-value work.",
      features: [
        "Voice-based scheduling",
        "Automated phone reminders",
        "Easy rescheduling by phone",
        "Calendar sync",
        "SMS & email confirmations",
        "Waitlist management",
      ],
    },
    {
      id: "sales",
      icon: ShoppingCart,
      title: "Sales Voice Agents",
      tagline: "AI sales reps that never sleep",
      problem: "Sales teams can't follow up with every lead fast enough, and phone prospecting is time-intensive.",
      solution: "AI voice agents that call leads, qualify prospects, answer product questions, and book sales meetings.",
      outcome: "3x faster lead response time, 40% more qualified meetings booked, and consistent sales conversations.",
      features: [
        "Outbound & inbound calling",
        "Lead qualification by voice",
        "Product Q&A over phone",
        "Meeting scheduling",
        "CRM auto-logging",
        "Lead scoring & insights",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What AI services does BrandingOnTheGo offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BrandingOnTheGo offers customer support bots, sales & lead capture bots, appointment & service bots, and custom voice AI agents powered by advanced AI technology."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can I deploy an AI chatbot?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "With BrandingOnTheGo, you can launch your AI agent in days, not months. Our ready-to-deploy templates and expert support ensure rapid implementation."
        }
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Chatbot & Automation Services",
    "provider": {
      "@type": "Organization",
      "name": "BrandingOnTheGo"
    },
    "areaServed": "Global",
    "description": "Comprehensive AI chatbot, voice agent, and automation solutions for businesses worldwide."
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="AI Voice Agent Services & Solutions"
        description="AI voice agents that handle phone calls 24/7. Inbound call automation, appointment scheduling, sales calls, and voice AI solutions that drive results."
        keywords="AI voice services, voice AI agents, AI phone answering, inbound call automation, voice automation services, AI calling agents, phone AI, conversational voice AI"
        canonical="https://brandingonthego.com/services"
        structuredData={[faqSchema, serviceSchema]}
      />
      <Navigation />

      {/* Hero */}
      <header className="pt-32 pb-20 gradient-primary" role="banner">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            AI Voice Agent Services That Transform Your Phone Line
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-white/90 animate-fade-in">
            Human-like voice AI that handles calls, answers questions, and drives conversions 24/7
          </p>
        </div>
      </header>

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
