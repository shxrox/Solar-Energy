import { MapPin, Sun, Users, Zap, CheckCircle2, ArrowRight, Phone, Mail } from "lucide-react";

export default function Story() {
  return (
    <div className="bg-base-100 text-base-content transition-colors duration-300">
      
      {/* --- HERO SECTION --- */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4 text-center max-w-4xl" data-aos="fade-down" data-aos-duration="1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-base-200 border border-base-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Proudly Sri Lankan 🇱🇰
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Powering the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Pearl of the Indian Ocean
            </span>
          </h1>
          <p className="text-lg text-base-content/80 leading-relaxed max-w-2xl mx-auto">
            From the bustling streets of Colombo to the sunny coasts of Trincomalee, VoltVision is dedicated to democratizing solar energy monitoring for every Sri Lankan household.
          </p>
        </div>
      </section>

      {/* --- MISSION & VISION --- */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative" data-aos="fade-right" data-aos-duration="1000">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-base-200 rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="/assets/images/srilanka.jpg" 
                  alt="Sri Lanka Sigiriya" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-base-100/90 backdrop-blur-md rounded-xl border border-base-200 shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/20 rounded-lg text-primary">
                            <Sun className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-bold text-lg">Sustainable Future</p>
                            <p className="text-xs opacity-70">Preserving our island's beauty</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8" data-aos="fade-left" data-aos-duration="1000">
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-base-content/80 text-lg leading-relaxed">
                Sri Lanka is blessed with abundant sunlight year-round. Yet, many homeowners struggle to manage their solar investments effectively. 
                <br/><br/>
                We built VoltVision to bridge this gap. Our mission is to provide an intelligent, localized platform that helps Sri Lankans maximize their energy independence while reducing the national grid burden.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-base-200 rounded-xl">
                    <h3 className="font-bold text-xl mb-1">500+</h3>
                    <p className="text-sm opacity-70">Homes Connected</p>
                </div>
                <div className="p-4 bg-base-200 rounded-xl">
                    <h3 className="font-bold text-xl mb-1">1.2 GWh</h3>
                    <p className="text-sm opacity-70">Clean Energy Tracked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SRI LANKA COVERAGE MAP SECTION --- */}
      <section className="py-24 bg-base-200 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12" data-aos="fade-up">Island-Wide Coverage</h2>
          
          <div 
            className="relative max-w-4xl mx-auto h-[600px] bg-base-100 rounded-3xl shadow-xl border border-base-300 overflow-hidden flex items-center justify-center"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            {/* Background Map Image */}
            <img 
              src="/assets/images/map.jpg" 
              alt="Sri Lanka Landscape"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent" />

            {/* Content overlaying the map */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 w-full">
                <div className="text-left space-y-6">
                    <div className="p-6 bg-base-100/80 backdrop-blur-md rounded-2xl border border-base-200 shadow-sm hover:scale-105 transition-transform cursor-default">
                        <div className="flex items-center gap-3 mb-2">
                            <MapPin className="text-red-500 w-5 h-5" />
                            <h3 className="font-bold">Western Province</h3>
                        </div>
                        <p className="text-sm opacity-70">Our headquarters in Colombo manages over 60% of our grid connections.</p>
                    </div>

                    <div className="p-6 bg-base-100/80 backdrop-blur-md rounded-2xl border border-base-200 shadow-sm hover:scale-105 transition-transform cursor-default ml-8">
                        <div className="flex items-center gap-3 mb-2">
                            <MapPin className="text-blue-500 w-5 h-5" />
                            <h3 className="font-bold">Southern Province</h3>
                        </div>
                        <p className="text-sm opacity-70">Rapidly expanding solar farms in Galle and Matara districts.</p>
                    </div>

                    <div className="p-6 bg-base-100/80 backdrop-blur-md rounded-2xl border border-base-200 shadow-sm hover:scale-105 transition-transform cursor-default">
                        <div className="flex items-center gap-3 mb-2">
                            <MapPin className="text-green-500 w-5 h-5" />
                            <h3 className="font-bold">Central Province</h3>
                        </div>
                        <p className="text-sm opacity-70">Supporting hydro-solar hybrid systems in Kandy and Nuwara Eliya.</p>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <div className="text-center p-8 bg-primary text-primary-content rounded-full w-48 h-48 flex flex-col items-center justify-center shadow-2xl animate-bounce-slow">
                        <Zap className="w-12 h-12 mb-2" />
                        <span className="font-bold text-2xl">24/7</span>
                        <span className="text-xs uppercase tracking-widest opacity-80">Monitoring</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUES GRID --- */}
      <section className="py-24 bg-w bg-base-100">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16" data-aos="fade-up">
                <h2 className="text-3xl font-bold">Why Sri Lanka Chooses Us</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <ValueCard  
                    icon={Users} 
                    title="Community First" 
                    desc="We prioritize local homeowners and small businesses, offering affordable plans tailored to the Sri Lankan economy." 
                    delay="100"
                />
                <ValueCard 
                    icon={CheckCircle2} 
                    title="Reliability" 
                    desc="Our systems are built to withstand tropical weather patterns, ensuring consistent data during monsoons." 
                    delay="200"
                />
                <ValueCard 
                    icon={Zap} 
                    title="Innovation" 
                    desc="We bring world-class digital twin technology to local infrastructure, modernizing the national grid." 
                    delay="300"
                />
            </div>
        </div>
      </section>

    </div>
  );
}

// Helper for Value Cards
function ValueCard({ icon: Icon, title, desc, delay }) {
    return (
        <div 
            className="p-8 rounded-2xl bg-base-100 border border-base-200 shadow-lg hover:shadow-xl transition-shadow text-center group"
            data-aos="fade-up"
            data-aos-delay={delay}
        >
            <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-base-content/70 leading-relaxed">{desc}</p>
        </div>
    );
}