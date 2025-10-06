import { TrendingUp, Clock, Users, DollarSign } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

const CaseStudies = () => {
  const caseStudies = [
    {
      company: "Bella's Salon & Spa",
      industry: "Beauty & Wellness",
      logo: "💇‍♀️",
      challenge: "Missing 40% of incoming calls due to staff being busy with clients, resulting in lost bookings and revenue.",
      solution: "Implemented 24/7 AI booking bot that handles appointments, sends reminders, and manages cancellations automatically.",
      results: [
        { icon: TrendingUp, label: "Booking Increase", value: "+35%" },
        { icon: Clock, label: "No-Show Rate", value: "-80%" },
        { icon: DollarSign, label: "Monthly Revenue", value: "+$12K" },
      ],
      testimonial: "The booking bot has been a game-changer. We never miss an opportunity now, and our clients love the instant responses.",
      author: "Maria Rodriguez, Owner",
    },
    {
      company: "TechGear Online",
      industry: "E-commerce",
      logo: "🛒",
      challenge: "Customer support team overwhelmed with repetitive questions about shipping, returns, and product specs.",
      solution: "Deployed AI customer support bot that handles FAQs, order tracking, and basic troubleshooting while routing complex issues to humans.",
      results: [
        { icon: Clock, label: "Response Time", value: "-70%" },
        { icon: Users, label: "Customer Satisfaction", value: "4.8/5" },
        { icon: DollarSign, label: "Support Cost Savings", value: "$8K/mo" },
      ],
      testimonial: "Our support team can now focus on complex issues while the bot handles the routine stuff. Customer satisfaction has never been higher.",
      author: "David Chen, Customer Success Manager",
    },
    {
      company: "Riverside Medical Clinic",
      industry: "Healthcare",
      logo: "🏥",
      challenge: "Front desk staff spending 60% of time on phone scheduling appointments, limiting time for patient care.",
      solution: "Implemented HIPAA-compliant scheduling bot that books appointments, sends reminders, and answers common questions.",
      results: [
        { icon: Users, label: "Patient Bookings", value: "+45%" },
        { icon: Clock, label: "Staff Time Saved", value: "15 hrs/week" },
        { icon: TrendingUp, label: "Patient Retention", value: "+28%" },
      ],
      testimonial: "The AI assistant has freed up our staff to focus on patient care. Appointments are scheduled faster and with fewer errors.",
      author: "Dr. Sarah Williams, Medical Director",
    },
    {
      company: "Premium Properties Group",
      industry: "Real Estate",
      logo: "🏠",
      challenge: "Agents missing leads from website visitors and spending too much time qualifying unqualified prospects.",
      solution: "Deployed lead qualification bot that engages visitors, captures information, qualifies prospects, and schedules viewings.",
      results: [
        { icon: Users, label: "Lead Capture", value: "3x" },
        { icon: TrendingUp, label: "Qualified Leads", value: "+120%" },
        { icon: DollarSign, label: "Closed Deals", value: "+$450K" },
      ],
      testimonial: "We're capturing leads we would have lost before, and our agents only talk to qualified, interested buyers.",
      author: "James Thompson, Broker",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 gradient-primary">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Real Results from Real Businesses
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90 animate-fade-in">
            See how businesses like yours are growing with AI automation
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="max-w-5xl mx-auto animate-fade-in"
              >
                <div className="bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow">
                  {/* Header */}
                  <div className="bg-muted/50 p-8 border-b border-border">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-5xl">{study.logo}</div>
                      <div>
                        <h2 className="text-2xl font-bold">{study.company}</h2>
                        <p className="text-muted-foreground">{study.industry}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12 space-y-8">
                    {/* Challenge */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-destructive flex items-center gap-2">
                        <span className="w-2 h-2 bg-destructive rounded-full"></span>
                        The Challenge
                      </h3>
                      <p className="text-muted-foreground">{study.challenge}</p>
                    </div>

                    {/* Solution */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-primary flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        The Solution
                      </h3>
                      <p className="text-muted-foreground">{study.solution}</p>
                    </div>

                    {/* Results */}
                    <div>
                      <h3 className="text-lg font-semibold mb-6 text-secondary flex items-center gap-2">
                        <span className="w-2 h-2 bg-secondary rounded-full"></span>
                        The Results
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {study.results.map((result, idx) => (
                          <div
                            key={idx}
                            className="bg-muted/30 rounded-xl p-6 text-center"
                          >
                            <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                              <result.icon className="text-white" size={24} />
                            </div>
                            <div className="text-3xl font-bold gradient-text mb-2">
                              {result.value}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {result.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-muted/30 rounded-xl p-8 border-l-4 border-primary">
                      <p className="text-lg italic mb-4">"{study.testimonial}"</p>
                      <div className="font-semibold">{study.author}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to achieve similar results?"
        subtitle="Book a free consultation and discover how AI can transform your business"
      />

      <Footer />
    </div>
  );
};

export default CaseStudies;
