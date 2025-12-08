

import { AlertTriangle, CloudOff, ZapOff, Timer, ArrowRight, ShieldAlert, XCircle } from "lucide-react";

export default function Problems() {
  return (
    <section className="relative bg-base-100 py-24 transition-colors duration-300 overflow-hidden">
      
      {/* Background Decor - Subtle Error Gradient */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-error/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-base-200 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* --- LEFT SECTION: TEXT CONTENT --- */}
          <div className="flex-1 space-y-8" data-aos="fade-right" data-aos-duration="1000">
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error/10 text-error text-sm font-semibold border border-error/20 mb-6">
                <AlertTriangle className="w-4 h-4" />
                <span>Hidden Inefficiencies</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-base-content leading-tight">
                Is Your System <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-error to-orange-500">
                  Losing Money?
                </span>
              </h2>
            </div>

            <p className="text-lg text-base-content/80 leading-relaxed">
              Home solar systems often face reduced efficiency due to unseen issues. Without active monitoring, these problems can go unnoticed for months, eating into your savings.
            </p>

            {/* Problem Grid */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <ProblemItem 
                icon={CloudOff} 
                text="Panel Shading & Dirt" 
                delay="100"
              />
              <ProblemItem 
                icon={ZapOff} 
                text="Unexpected Output Drops" 
                delay="200"
              />
              <ProblemItem 
                icon={ShieldAlert} 
                text="Inverter Malfunctions" 
                delay="300"
              />
              <ProblemItem 
                icon={Timer} 
                text="Missed Maintenance" 
                delay="400"
              />
            </div>

            <div className="pt-4" data-aos="fade-up" data-aos-delay="500">
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-error" />
                    <span>Traditional systems don't alert you. <span className="text-base-content font-bold">We do.</span></span>
                </p>
            </div>
          </div>

          {/* --- RIGHT SECTION: VISUALS --- */}
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none" data-aos="fade-left" data-aos-duration="1000">
            
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-base-200 group h-[500px]">
              <img
                src="../public/assets/images/home4.avif"
                alt="Solar Panels Maintenance"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

              {/* Floating Alert Card */}
              <div className="absolute bottom-8 left-8 right-8 p-4 bg-base-100/95 backdrop-blur-md rounded-xl border-l-4 border-l-error shadow-lg transform transition-transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-error/10 rounded-full text-error shrink-0">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-base-content text-sm uppercase tracking-wide mb-1">Anomaly Detected</h4>
                        <p className="text-sm text-base-content/70">
                            "Output dropped by 35% on Unit #2. Possible shading obstruction detected."
                        </p>
                    </div>
                </div>
              </div>
            </div>

            {/* Background Blob behind image */}
            <div className="absolute -z-10 top-10 -right-10 w-64 h-64 bg-error/20 rounded-full blur-3xl animate-pulse" />
          </div>

        </div>
      </div>
    </section>
  );
}

// Helper Component for List Items
function ProblemItem({ icon: Icon, text, delay }) {
  return (
    <div 
      className="flex items-center gap-3 p-3 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors border border-transparent hover:border-base-300"
      data-aos="fade-up" 
      data-aos-delay={delay}
    >
      <div className="p-2 rounded-md bg-base-100 text-error shadow-sm">
        <Icon className="w-5 h-5" />
      </div>
      <span className="font-medium text-base-content">{text}</span>
    </div>
  );
}