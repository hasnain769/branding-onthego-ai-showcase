import { Link } from "react-router-dom";
import { MessageSquare, ShoppingCart, Calendar, Mic, Store, Scissors, Heart, Home, Monitor, ArrowRight, CheckCircle2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import TemplateCard from "@/components/TemplateCard";
import MetricCard from "@/components/MetricCard";
import CTASection from "@/components/CTASection";
import VapiWidget from "@/components/VapiWidget";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const services = [
    {
      icon: MessageSquare,
      title: "Customer Support Bot",
      description: "Never miss a question. Instantly answers FAQs, policies, and product info.",
      link: "/services#support",
    },
    {
      icon: ShoppingCart,
      title: "Sales & Lead Capture Bot",
      description: "Turn clicks into customers. Captures contact info, qualifies leads, and books calls.",
      link: "/services#sales",
    },
    {
      icon: Calendar,
      title: "Appointment & Service Bot",
      description: "Simplify scheduling. Books, reschedules, and confirms appointments.",
      link: "/services#appointment",
    },
    {
      icon: Mic,
      title: "Voice & Custom AI Agents",
      description: "Talk, don't type. Handle calls, summarize conversations, and assist teams.",
      link: "/services#voice",
    },
  ];

  const templates = [
    {
      icon: Store,
      title: "Retail & E-commerce",
      description: "Handle product inquiries, track orders, and capture leads 24/7.",
    },
    {
      icon: Scissors,
      title: "Salons & Spas",
      description: "Book appointments, send reminders, and manage client preferences.",
    },
    {
      icon: Heart,
      title: "Medical & Clinics",
      description: "Schedule patient appointments and answer common health questions.",
    },
    {
      icon: Home,
      title: "Real Estate",
      description: "Qualify leads, schedule viewings, and provide property information.",
    },
    {
      icon: Monitor,
      title: "SaaS & Services",
      description: "Support customers, demo products, and collect feedback.",
    },
  ];

  const metrics = [
    { value: "2,000+", label: "Leads captured monthly" },
    { value: "< 8s", label: "Avg. response time" },
    { value: "+28%", label: "Increase in bookings" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(46, 144, 255, 0.95), rgba(124, 58, 237, 0.95)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Never miss a question. Convert more customers. Book less follow-up.
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white/90 animate-fade-in">
              On the Go builds AI agents, voice assistants, and automations that answer FAQs, capture leads, 
              and schedule appointments — so your team can focus on what matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button variant="outline-white" size="xl" asChild>
                <Link to="/contact">Book a Free Strategy Call</Link>
              </Button>
              <Button variant="outline-white" size="xl" asChild>
                <Link to="/services">See Live Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI Solutions That Work for You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect AI agent for your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for every industry
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started fast with ready-to-deploy AI templates
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {templates.map((template, index) => (
              <TemplateCard key={index} {...template} />
            ))}
          </div>
          <div className="text-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/templates">View All Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Launch your AI agent in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Choose your bot or template", description: "Select from our pre-built templates or customize your own" },
              { step: "2", title: "Connect your tools & data", description: "Integrate with your existing systems seamlessly" },
              { step: "3", title: "Launch in days — not months", description: "Go live quickly with our expert support" },
            ].map((item) => (
              <div key={item.step} className="text-center animate-fade-in">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose On the Go
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results from businesses like yours
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            {metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>
          <div className="bg-card border border-border rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-primary text-xl">★</span>
                  ))}
                </div>
                <p className="text-lg mb-4 italic">
                  "On the Go transformed how we handle customer inquiries. Our response time dropped by 70% 
                  and we're capturing 3x more leads than before."
                </p>
                <div className="font-semibold">Sarah Johnson</div>
                <div className="text-sm text-muted-foreground">CEO, RetailPro</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real results from real businesses
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {[
              {
                title: "Salon increased bookings by 35%",
                problem: "Missing calls meant lost revenue",
                solution: "24/7 booking bot captured every opportunity",
                result: "+35% monthly bookings",
              },
              {
                title: "E-commerce store cut response time by 70%",
                problem: "Customers waiting hours for answers",
                solution: "Support bot answered instantly",
                result: "4.8/5 customer satisfaction",
              },
            ].map((study, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-shadow animate-fade-in">
                <h3 className="text-xl font-bold mb-4">{study.title}</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <CheckCircle2 className="text-destructive flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="font-semibold text-sm">Problem</div>
                      <div className="text-muted-foreground text-sm">{study.problem}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="font-semibold text-sm">Solution</div>
                      <div className="text-muted-foreground text-sm">{study.solution}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="text-secondary flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="font-semibold text-sm">Result</div>
                      <div className="text-muted-foreground text-sm">{study.result}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/case-studies">
                View All Case Studies <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Let's automate your business today"
        subtitle="Start with a free strategy call. No credit card needed."
        secondaryText="Or chat with our AI demo now"
      />

      <Footer />
      
      {/* Vapi Voice Agent Widget */}
      <VapiWidget />
    </div>
  );
};

export default Index;
