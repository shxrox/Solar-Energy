// const SolarEnergyProduction = () => {
//     return (
//         <div className="flex min-h-screen flex-col lg:flex-row">
//             <div className="flex-1 p-2 sm:p-4">
//                 <div className="h-64 overflow-hidden rounded-3xl sm:h-80 lg:h-full">
//                     <img className="h-full w-full object-cover" src="https://fed-4-frontend.netlify.app/assets/wind-turbine-2-i2cMFNlb.png" alt="" />
//                 </div>

//             </div>
//             <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-12">
//                 <div className="mx-auto max-w-lg lg:mx-0">
//                     <h2 className="mb-6 text-center text-3xl leading-tight font-bold text-gray-900 sm:mb-8 sm:text-4xl lg:text-left lg:text-5xl">Your Solar Energy Generation</h2>
//                     <p className="mb-8 text-center text-base leading-relaxed text-gray-700 sm:mb-12 sm:text-lg lg:text-left">This month, your solar panels generated 
//                     <span className="font-semibold text-blue-600"> X kWh </span>
//                     of clean energy, helping you save on electricity bills and reduce your carbon footprint. Track your energy production trends and see how much power you contribute back to the grid.</p>
//                 </div>
//                 <div className="mx-auto h-40 w-56 overflow-hidden rounded-2xl sm:h-48 sm:w-64 lg:mx-0">
//                     <img className="h-full w-full object-cover" src="https://fed-4-frontend.netlify.app/assets/solar-construction-DLKEjVnj.webp" alt="" />
//                 </div>
//             </div>

//         </div>
//     )
// }
// export default SolarEnergyProduction;

import { Activity, ArrowUpRight, Battery, Zap } from "lucide-react";

export default function SolarEnergyProduction() {
  return (
    <section className="relative overflow-hidden bg-base-200 py-20 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* --- LEFT COLUMN: VISUALS --- */}
          <div className="flex-1 relative w-full" data-aos="fade-right" data-aos-duration="1000">
            {/* Main Large Image */}
            <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl border-4 border-base-100 h-[400px] lg:h-[600px] group">
              <img 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src="/assets/images/home2.jpg" 
                alt="Solar Array in Field" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Floating Stat Card (Bottom Right) */}
            <div 
              className="absolute -bottom-6 -right-6 z-20 bg-base-100 p-6 rounded-2xl shadow-xl border border-base-300 max-w-xs hidden sm:block"
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-muted-foreground">Efficiency</span>
              </div>
              <div className="text-3xl font-bold text-base-content">98.4%</div>
              <div className="text-xs text-green-600 mt-1 flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +2.4% this month
              </div>
            </div>

            {/* Decorative Dots */}
            <div className="absolute -top-12 -left-12 opacity-50 pointer-events-none">
               <div className="w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            </div>
          </div>

          {/* --- RIGHT COLUMN: CONTENT --- */}
          <div className="flex-1 space-y-8" data-aos="fade-left" data-aos-duration="1000">
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-primary text-sm font-semibold border border-primary/20 mb-4">
                <Zap className="w-4 h-4 fill-current" />
                <span>Impact Analysis</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-base-content leading-tight">
                Your Energy, <br/>
                <span className=" ">Visualized.</span>
              </h2>
            </div>

            <p className="text-lg text-base-content/80 leading-relaxed">
              This month, your solar panels generated <span className="font-bold text-blue-800">1,240 kWh</span> of clean energy. That's enough to power an average home for 45 days.
            </p>

            <p className="text-base text-base-content/70">
              Track your production trends, monitor panel health, and watch your carbon footprint shrink—all in real-time through our intuitive dashboard.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <FeatureItem 
                title="Carbon Offset" 
                desc="Reduce CO2 equivalent to planting 12 trees."
                delay="100"
              />
              <FeatureItem 
                title="Grid Contribution" 
                desc="Sell excess power back to the grid automatically."
                delay="200"
              />
            </div>

            {/* Secondary Small Image (Interactive) */}
            <div 
              className="relative h-48 w-full sm:w-80 rounded-2xl overflow-hidden shadow-lg border-2 border-base-content/10 mt-8 group"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
               <img 
                 className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                 src="/assets/images/home3.jpg" 
                 alt="Solar Roof Installation" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider mb-1 text-primary">
                      <Battery className="w-3 h-3" /> Storage
                    </div>
                    <p className="font-semibold">Integrated Battery Support</p>
                  </div>
               </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

// Helper Component for Features
function FeatureItem({ title, desc, delay }) {
  return (
    <div 
      className="p-4 bg-base-100 rounded-xl border border-base-300 shadow-sm hover:shadow-md transition-shadow"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <h3 className="font-bold text-base-content mb-1">{title}</h3>
      <p className="text-sm text-base-content/70">{desc}</p>
    </div>
  );
}