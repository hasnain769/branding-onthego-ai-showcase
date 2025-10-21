import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, PhoneCall, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdi1qPJF9-nvmFTuFcfEtQc3OslW54WuzDj4EQjXZTTzrqfEw/formResponse";

const FIELD_IDS = {
  name: "entry.208529617",
  email: "entry.829404065",
  phone: "entry.408120186",
  company: "entry.2034433684",
  service: "entry.1377611517",
  message: "entry.1045858748",
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Not Sure Yet",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Call Me Now states
  const [callFormOpen, setCallFormOpen] = useState(false);
  const [callPhone, setCallPhone] = useState("");
  const [callName, setCallName] = useState("");
  const [isSchedulingCall, setIsSchedulingCall] = useState(false);
  const [callCooldown, setCallCooldown] = useState(0);

  // Check session storage for cooldown on mount
  useEffect(() => {
    const cooldownEnd = sessionStorage.getItem('call_cooldown_end');
    if (cooldownEnd) {
      const timeLeft = Math.floor((parseInt(cooldownEnd) - Date.now()) / 1000);
      if (timeLeft > 0) {
        setCallCooldown(timeLeft);
      } else {
        sessionStorage.removeItem('call_cooldown_end');
      }
    }
  }, []);

  // Cooldown timer
  useEffect(() => {
    if (callCooldown > 0) {
      const timer = setInterval(() => {
        setCallCooldown((prev) => {
          if (prev <= 1) {
            sessionStorage.removeItem('call_cooldown_end');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [callCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formBody = new FormData();
    formBody.append(FIELD_IDS.name, formData.name);
    formBody.append(FIELD_IDS.email, formData.email);
    formBody.append(FIELD_IDS.phone, formData.phone);
    formBody.append(FIELD_IDS.company, formData.company);
    formBody.append(FIELD_IDS.service, formData.service);
    formBody.append(FIELD_IDS.message, formData.message);

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        body: formBody,
        mode: "no-cors",
      });

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleScheduleCall = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSchedulingCall(true);

    try {
      const { data, error } = await supabase.functions.invoke('schedule-call', {
        body: { name: callName, phone: callPhone }
      });

      if (error) throw error;

      toast({
        title: "Call Scheduled!",
        description: "We'll call you within 5 minutes.",
      });

      // Set cooldown for 5 minutes
      const cooldownEnd = Date.now() + 5 * 60 * 1000;
      sessionStorage.setItem('call_cooldown_end', cooldownEnd.toString());
      setCallCooldown(300); // 5 minutes in seconds

      // Reset form
      setCallName("");
      setCallPhone("");
      setCallFormOpen(false);
    } catch (error) {
      console.error('Error scheduling call:', error);
      toast({
        title: "Error",
        description: "Failed to schedule call. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSchedulingCall(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 gradient-primary">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Let's Start Automating Your Business
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90 animate-fade-in">
            Book a free strategy call or send us a message. We'll help you find the perfect AI solution.
          </p>
        </div>
      </section>

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
                    <Label htmlFor="phone">Phone </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    
                      placeholder="+1 (555) 123-4567"
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
                        <SelectItem value="AI Voice Agents">AI Voice Agents</SelectItem>
                        <SelectItem value="Inbound Call Automation">Inbound Call Automation</SelectItem>
                        <SelectItem value="Appointment Scheduling Voice Bots">Appointment Scheduling Voice Bots</SelectItem>
                        <SelectItem value="Sales Voice Agents">Sales Voice Agents</SelectItem>
                        <SelectItem value="Custom Solution">Custom Solution</SelectItem>
                        <SelectItem value="Not Sure Yet">Not Sure Yet</SelectItem>
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

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send size={20} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>

              <div className="mt-8 p-4 sm:p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
                <Collapsible open={callFormOpen} onOpenChange={setCallFormOpen}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <PhoneCall className="text-primary flex-shrink-0" size={24} />
                      <p className="font-semibold text-sm sm:text-base">
                        Get a Call from Our AI Agent
                      </p>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" disabled={callCooldown > 0}>
                        <ChevronDown className={`h-4 w-4 transition-transform ${callFormOpen ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                  </div>

                  {callCooldown > 0 && (
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm font-medium">
                        We'll call you within {Math.floor(callCooldown / 60)}:{(callCooldown % 60).toString().padStart(2, '0')} minutes
                      </p>
                    </div>
                  )}

                  <CollapsibleContent className="mt-4">
                    <form onSubmit={handleScheduleCall} className="space-y-4">
                      <div>
                        <Label htmlFor="call-name">Your Name *</Label>
                        <Input
                          id="call-name"
                          value={callName}
                          onChange={(e) => setCallName(e.target.value)}
                          required
                          placeholder="Enter your name"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="call-phone">Phone Number *</Label>
                        <Input
                          id="call-phone"
                          type="tel"
                          value={callPhone}
                          onChange={(e) => setCallPhone(e.target.value)}
                          required
                          placeholder="+1 (555) 123-4567"
                          className="mt-2"
                        />
                      </div>
                      <Button
                        type="submit"
                        variant="outline"
                        size="lg"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                        disabled={isSchedulingCall || callCooldown > 0}
                      >
                        {isSchedulingCall ? (
                          "Scheduling..."
                        ) : (
                          <>
                            <PhoneCall size={18} className="mr-2" />
                            Call Me Now
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        We'll call you within 2 minutes to discuss your needs
                      </p>
                    </form>
                  </CollapsibleContent>
                </Collapsible>
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
                    <p className="text-muted-foreground">info@brandingonthego.com</p>
                    <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (917) 523-1911</p>
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
