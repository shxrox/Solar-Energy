
import { CheckCircle2, Zap, BarChart3, Smartphone, ArrowRight } from "lucide-react";

export default function Solution() {
  return (
    <section className="relative overflow-hidden bg-base-100 py-24 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* --- LEFT SIDE: VISUALS --- */}
          <div className="flex-1 relative w-full" data-aos="fade-right" data-aos-duration="1000">
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-base-200 group h-[500px]">
              <img
                src="/assets/images/home5.jpg"
                alt="Solar Dashboard"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Floating "Aelora/VoltVision" Card */}
              <div className="absolute bottom-8 left-8 bg-base-100/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-base-200 flex items-center gap-4 animate-bounce-slow">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-content shadow-md">
                   <Zap className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Powered By</p>
                  <p className="text-xl font-bold text-base-content">VoltVision</p>
                </div>
              </div>
            </div>

            {/* Background Decor */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          </div>

          {/* --- RIGHT SIDE: CONTENT --- */}
          <div className="flex-1 space-y-8" data-aos="fade-left" data-aos-duration="1000">
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-semibold border border-success/20 mb-6">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Smart Solution</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-base-content leading-tight">
                Take Control of Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-success to-emerald-600">
                  Energy Future
                </span>
              </h2>
            </div>

            <p className="text-lg text-base-content/80 leading-relaxed">
              The VoltVision Dashboard empowers homeowners to monitor solar performance, receive instant anomaly alerts, and optimize usage—all from one intuitive interface.
            </p>

            {/* Feature List */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <SolutionItem 
                icon={BarChart3} 
                text="Real-time Analytics" 
                delay="100"
              />
              <SolutionItem 
                icon={Zap} 
                text="Instant Anomaly Alerts" 
                delay="200"
              />
              <SolutionItem 
                icon={Smartphone} 
                text="Remote Diagnostics" 
                delay="300"
              />
              <SolutionItem 
                icon={CheckCircle2} 
                text="Automated Reporting" 
                delay="400"
              />
            </div>

            <div className="pt-6" data-aos="fade-up" data-aos-delay="500">
                <button className="btn btn-primary btn-lg rounded-full px-8 shadow-lg hover:shadow-primary/30 transition-all group">
                    Start Monitoring Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

// Helper Component
function SolutionItem({ icon: Icon, text, delay }) {
  return (
    <div 
      className="flex items-center gap-3 p-4 rounded-xl bg-base-200/50 border border-base-200 hover:border-primary/50 hover:bg-base-200 transition-all duration-300 group"
      data-aos="fade-up" 
      data-aos-delay={delay}
    >
      <div className="p-2 rounded-lg bg-base-100 text-primary shadow-sm group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5" />
      </div>
      <span className="font-semibold text-base-content">{text}</span>
    </div>
  );
}