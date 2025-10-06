import { Target, Users, Lightbulb, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import teamPhoto from "@/assets/team-photo.jpg";

const About = () => {
  const values = [
    {
      icon: Users,
      title: "Human-Centered AI",
      description: "We build AI that enhances human capabilities, not replaces them. Our solutions empower your team to focus on what matters most.",
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "We measure success by your results. Every solution is designed to deliver measurable improvements to your business.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We stay at the forefront of AI technology to bring you the most effective and efficient automation solutions.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We're committed to delivering exceptional quality in every project, from initial consultation to ongoing support.",
    },
  ];

  const timeline = [
    {
      year: "2022",
      title: "Founded",
      description: "Started with a mission to make AI automation accessible to businesses of all sizes.",
    },
    {
      year: "2023",
      title: "First 100 Clients",
      description: "Helped 100+ businesses automate customer service, sales, and scheduling.",
    },
    {
      year: "2024",
      title: "Industry Leader",
      description: "Expanded to serve multiple industries with specialized AI solutions.",
    },
    {
      year: "2025",
      title: "Scaling Impact",
      description: "Processing 1M+ customer interactions monthly across our AI agent network.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 gradient-primary">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            We're humans building AI for humans
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90 animate-fade-in">
            On the Go was founded on the belief that AI should feel effortless and personal
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              At On the Go, we believe AI should feel effortless and personal. Our mission is to help businesses 
              save time and create better customer experiences through intelligent automation. We're passionate 
              about making advanced AI technology accessible, practical, and human-centered.
            </p>
          </div>
        </div>
      </section>

      {/* Team Photo */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <img
              src={teamPhoto}
              alt="On the Go Team"
              className="w-full rounded-2xl shadow-2xl animate-fade-in"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow animate-fade-in"
              >
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="text-white" size={28} />
                </div>
                <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From startup to AI automation leader
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-8 items-start animate-fade-in"
                >
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 gradient-primary rounded-xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{item.year}</span>
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: "500+", label: "Happy Clients" },
              { value: "1M+", label: "Monthly Interactions" },
              { value: "24/7", label: "AI Availability" },
              { value: "98%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center animate-scale-in">
                <div className="text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Let's build your first AI agent"
        subtitle="Join hundreds of businesses that trust On the Go for their AI automation"
      />

      <Footer />
    </div>
  );
};

export default About;
