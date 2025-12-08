
import { ArrowRight, BarChart3, ShieldCheck, Sun, Zap } from "lucide-react";
import { Link } from "react-router";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-base-100 text-base-content transition-colors duration-300">
      
      {/* Background Decor - Gradient Orbs */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute top-1/2 -left-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navbar-like Feature Strip */}
        <div className="hidden md:flex justify-center py-8">
          <div className="inline-flex items-center gap-1 p-1 bg-base-200/50 backdrop-blur-md rounded-full border border-base-300 shadow-sm">
            <FeatureBadge icon={Sun} label="Solar Energy" color="text-yellow-500" />
            <div className="h-4 w-px bg-base-300 mx-2" />
            <FeatureBadge icon={BarChart3} label="Real-Time Analytics" color="text-blue-500" />
            <div className="h-4 w-px bg-base-300 mx-2" />
            <FeatureBadge icon={ShieldCheck} label="System Health" color="text-green-500" />
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-12 lg:py-24">
          
          {/* Text Content */}
          <div     data-aos="fade-right"
    data-aos-offset="100"
    data-aos-delay="20"
    data-aos-duration="800"
    data-aos-easing="ease-in-out"
    data-aos-mirror="true"
    data-aos-once="false"
    data-aos-anchor-placement="top-center" className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-primary text-sm font-semibold border border-primary/20">
              <Zap className="w-4 h-4 fill-current" />
              <span>Smart Energy Monitoring</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Power Your Home <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                With Intelligence
              </span>
            </h1>

            <p  className="text-lg sm:text-xl text-base-content/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Track your solar generation, detect anomalies instantly, and manage your energy savings with VoltVision's advanced dashboard.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link to="/sign-up" className="btn btn-primary btn-lg rounded-full px-8 shadow-lg hover:shadow-primary/50 transition-all">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/sign-in" className="btn btn-ghost btn-lg rounded-full px-8">
                Live Demo
              </Link>
            </div>

            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Trust Badges / Social Proof */}
               <p className="text-sm font-semibold text-base-content/60 uppercase tracking-widest">Trusted by 2,000+ Homeowners</p>
            </div>
          </div>

          {/* Visual Content (Image Grid) */}
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
            <div className="relative">
                {/* Floating Card 1 */}
                <div className="absolute -top-12 -left-8 z-20 animate-bounce-slow hidden md:block">
                    <div className="bg-base-100 p-4 rounded-2xl shadow-xl border border-base-200 flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Zap className="w-6 h-6 text-green-600 fill-current" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">Energy Saved</p>
                            <p className="text-lg font-bold text-base-content">1.2 MWh</p>
                        </div>
                    </div>
                </div>

                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-base-100 rotate-2 hover:rotate-0 transition-transform duration-500">
                    <img 
                        src="../public/assets/images/home.avif" 
                        alt="Solar Panels on Roof" 
                        className="w-full h-auto object-cover transform scale-105 hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                        <p className="font-medium text-lg">Sustainable Future</p>
                        <p className="text-sm opacity-80">Powered by the sun</p>
                    </div>
                </div>

                {/* Floating Card 2 */}
                <div className="absolute -bottom-8 -right-4 z-20 animate-bounce-slow-reverse hidden md:block">
                    <div className="bg-base-100 p-4 rounded-2xl shadow-xl border border-base-200 flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <ShieldCheck className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">System Status</p>
                            <p className="text-lg font-bold text-base-content">Optimal</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Helper Component for the top bar
function FeatureBadge({ icon: Icon, label, color }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-base-100 transition-colors cursor-default">
      <div className={`p-1.5 rounded-full bg-base-100 shadow-sm ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}