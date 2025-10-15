import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact BrandingOnTheGo",
    "description": "Get in touch with BrandingOnTheGo for AI chatbot and voice agent solutions. Free consultation available.",
    "provider": {
      "@type": "Organization",
      "name": "BrandingOnTheGo",
      "email": "hello@onthego.ai",
      "telephone": "+1-555-123-4567",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 AI Avenue, Suite 100",
        "addressLocality": "San Francisco",
        "addressRegion": "CA",
        "postalCode": "94102",
        "addressCountry": "US"
      }
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Contact Us - Free AI Consultation"
        description="Contact BrandingOnTheGo for AI chatbots, voice agents, and automation solutions. Free 30-minute strategy call. We reply within 24 hours."
        keywords="contact AI agency, AI consultation, chatbot demo, voice agent inquiry, AI automation contact, free AI strategy call"
        canonical="https://brandingonthego.vercel.app/contact"
        structuredData={contactSchema}
      />
      <Navigation />

      {/* Hero */}
      <header className="pt-32 pb-20 gradient-primary" role="banner">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Let's Start Automating Your Business
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90 animate-fade-in">
            Book a free strategy call or send us a message. We'll help you find the perfect AI solution.
          </p>
        </div>
      </header>

      {/* Contact Form & Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Form */}
            <div className="animate-fade-in">
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="service">What service are you interested in? *</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) =>
                        setFormData({ ...formData, service: value })
                      }
                      required
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">Customer Support Bot</SelectItem>
                        <SelectItem value="sales">Sales & Lead Capture Bot</SelectItem>
                        <SelectItem value="appointment">Appointment & Service Bot</SelectItem>
                        <SelectItem value="voice">Voice & Custom AI Agents</SelectItem>
                        <SelectItem value="custom">Custom Solution</SelectItem>
                        <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your needs..."
                      className="mt-2 min-h-[120px]"
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    <Send size={20} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>

              <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Prefer a live chat?</strong> Try our AI demo bot now to see how our 
                  technology works in real-time.
                </p>
              </div>
            </div>

            {/* Right: Contact Info */}
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
                <p className="text-muted-foreground mb-8">
                  Ready to transform your customer experience? We're here to help. 
                  Schedule a free 30-minute consultation to discuss your needs.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">hello@onthego.ai</p>
                    <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office</h3>
                    <p className="text-muted-foreground">123 AI Avenue, Suite 100</p>
                    <p className="text-muted-foreground">San Francisco, CA 94102</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 mt-8">
                <h3 className="font-semibold mb-4">What happens next?</h3>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-primary font-semibold">1.</span>
                    <span>We review your message and schedule a call within 24 hours</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-semibold">2.</span>
                    <span>We discuss your needs and recommend the best solution</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-semibold">3.</span>
                    <span>We create a custom proposal and implementation plan</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-semibold">4.</span>
                    <span>You launch your AI agent in days, not months</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
