
import { Target, CheckCircle2, User, TrendingUp, ShieldCheck } from "lucide-react";

export default function GoalsAndNeeds() {
  const goals = [
    "Maximize solar energy savings",
    "Detect and resolve issues early",
    "Track monthly output trends",
    "Get instant anomaly notifications",
  ];

  const needs = [
    "Simple real-time monitoring dashboard",
    "Instant alerts for system anomalies",
    "Easy access to historical data",
    "Actionable insights for management",
  ];

  return (
    <section className="relative overflow-hidden bg-base-200 py-24 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* --- LEFT SECTION: CONTENT --- */}
          <div className="flex-1 space-y-12" data-aos="fade-right" data-aos-duration="1000">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-primary text-sm font-semibold border border-primary/20 mb-6">
                <Target className="w-4 h-4" />
                <span>Customer Focus</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-base-content leading-tight">
                Built for Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Solar Success
                </span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {/* Goals Column */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-base-content flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-secondary" /> 
                  Your Goals
                </h3>
                <ul className="space-y-4">
                  {goals.map((goal, idx) => (
                    <li key={idx} className="flex items-start gap-3 group">
                      <div className="mt-1 p-1 rounded-full bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-content transition-colors">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span className="text-base-content/80 group-hover:text-base-content transition-colors">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Needs Column */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-base-content flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" /> 
                  Your Needs
                </h3>
                <ul className="space-y-4">
                  {needs.map((need, idx) => (
                    <li key={idx} className="flex items-start gap-3 group">
                      <div className="mt-1 p-1 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span className="text-base-content/80 group-hover:text-base-content transition-colors">{need}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="p-6 rounded-2xl bg-base-100 shadow-xl border border-base-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Target className="w-24 h-24 text-primary" />
              </div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-primary/20">
                  <img
                    src="../public/assets/images/profile.jpg"
                    alt="Kumaru P."
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-lg text-base-content">Kumaru P.</p>
                  <p className="text-sm text-base-content/60">Solar Homeowner • 2 Years</p>
                </div>
                <div className="ml-auto hidden sm:block">
                   <span className="badge badge-primary badge-outline font-semibold">Verified User</span>
                </div>
              </div>
              <p className="mt-4 text-base-content/80 italic">
                "VoltVision gave me clarity. I finally understand my energy production and resolved a shading issue that was costing me hundreds."
              </p>
            </div>

          </div>

          {/* --- RIGHT SECTION: VISUALS --- */}
          <div className="flex-1 relative w-full lg:h-auto min-h-[400px]" data-aos="fade-left" data-aos-duration="1000">
            {/* Main Image */}
            <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-base-100 group">
              <img
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="../public/assets/images/home.jpg"
                alt="Solar Panel Installation"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating User Profile Card */}
              <div className="absolute top-8 right-8 animate-float">
                <div className="flex items-center gap-3 rounded-2xl bg-base-100/95 backdrop-blur-md p-4 shadow-lg border border-base-200 hover:scale-105 transition-transform cursor-default">
                  <div className="p-2.5 bg-primary text-primary-content rounded-xl shadow-md">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Active Profile</p>
                    <p className="text-sm font-bold text-base-content">Homeowner View</p>
                  </div>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute mt-10 bottom-8 left-8 text-white max-w-xs">
                <p className="font-bold text-xl mb-1">Seamless Integration</p>
                <p className="text-sm opacity-80">Connects with all major inverter brands automatically.</p>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}