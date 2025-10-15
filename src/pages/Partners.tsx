import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

const partnerFormSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20),
  businessName: z.string().trim().max(100).optional(),
  experience: z.string().trim().min(10, "Please provide more details about your experience").max(1000),
  whyPartner: z.string().trim().min(10, "Please tell us why you want to partner").max(1000),
});

type PartnerFormData = z.infer<typeof partnerFormSchema>;

const Partners = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerFormSchema),
  });

  const onSubmit = async (data: PartnerFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("entry.96804154", data.fullName); // name
      formData.append("entry.1811682831", data.email); // email
      formData.append("entry.1455157687", data.phone); // phone
      formData.append("entry.1673054986", data.businessName || ""); // company
      formData.append("entry.814604571", data.experience); // sales experience
      formData.append("entry.58399267", data.whyPartner); // why partner

      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSf4UWrDamqw4Fw0SiG2j9M8kAOkFwMl6d7xQMqwlDakCT1GeQ/formResponse",
        { method: "POST", mode: "no-cors", body: formData }
      );

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you within 48 hours.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    "Your own AI Voice Agent + Unique Phone Number",
    "A clean, branded landing page to promote your services",
    "Full training, sales scripts & marketing tools",
    "Commission system with recurring income opportunities",
    "Ongoing maintenance & support — we handle the tech, you focus on sales",
  ];

  const earnings = [
    "Earn commissions on every sale you generate — including recurring monthly subscriptions",
    "Share your agent, landing page, or referral link to close deals",
    "We handle fulfillment and support — you collect your commissions",
  ];

  const whyJoin = [
    "No tech skills required — we do the heavy lifting",
    "Quick setup — launch your business in days, not months",
    "Scalable model — grow your income as much as you want",
    "Be part of a real business opportunity, not hype",
  ];

  const steps = [
    { number: "1", title: "Apply & Pay Your Setup Fee", description: "Get your agent, page, and tracking ID" },
    { number: "2", title: "Complete Your Training", description: "Learn how to pitch and promote with ease" },
    { number: "3", title: "Launch Your AI Business", description: "Start sharing your agent and earning commissions" },
  ];

  const perfectFor = [
    "Entrepreneurs and side hustlers ready to tap into the AI boom",
    "Affiliate marketers who want a done-for-you tech product to promote",
    "Business owners who want to add a new income stream",
    "Anyone who loves sales but doesn't want to build software",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
              Partner With Us — Build Your Own AI Business Without the Overhead
            </h1>
            <p className="text-xl text-white/90 mb-8 animate-fade-in">
              The AI industry is booming. Businesses everywhere are looking for smarter ways to save time, 
              capture more leads, and grow 24/7 — and we're giving you the opportunity to be part of that growth.
            </p>
            <p className="text-lg text-white/80 animate-fade-in">
              Our Partner Program lets you launch your own AI sales business with zero tech stress. 
              You'll get your own branded AI voice agent, a landing page, training, and full backend support — 
              so you can focus on earning.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              💼 What You Get as a Partner
            </h2>
            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How You Earn Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              💰 How You Earn
            </h2>
            <div className="grid gap-4">
              {earnings.map((earning, index) => (
                <div key={index} className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border">
                  <Check className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground">{earning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              🪄 Why Join Our Program
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {whyJoin.map((reason, index) => (
                <div key={index} className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
                  <Check className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <p className="text-foreground">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              📝 How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              ✨ Who This Is Perfect For
            </h2>
            <div className="grid gap-4">
              {perfectFor.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                📲 Ready to Partner With Us?
              </h2>
              <p className="text-xl text-white/90">
                This isn't just another affiliate link — this is your chance to build your own 
                AI-powered income stream with a trusted system behind you.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    {...register("fullName")}
                    placeholder="John Doe"
                    className="mt-2"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="john@example.com"
                    className="mt-2"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="+1 (555) 123-4567"
                    className="mt-2"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="businessName">Business Name (Optional)</Label>
                  <Input
                    id="businessName"
                    {...register("businessName")}
                    placeholder="Your Company LLC"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Tell us about your sales/business experience *</Label>
                  <Textarea
                    id="experience"
                    {...register("experience")}
                    placeholder="Describe your background in sales, marketing, or business..."
                    className="mt-2 min-h-[120px]"
                  />
                  {errors.experience && (
                    <p className="text-sm text-destructive mt-1">{errors.experience.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="whyPartner">Why do you want to partner with us? *</Label>
                  <Textarea
                    id="whyPartner"
                    {...register("whyPartner")}
                    placeholder="Tell us what excites you about this opportunity..."
                    className="mt-2 min-h-[120px]"
                  />
                  {errors.whyPartner && (
                    <p className="text-sm text-destructive mt-1">{errors.whyPartner.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Apply Now to Become a Partner"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partners;
