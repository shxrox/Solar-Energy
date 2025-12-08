import imgWindTurbine from "./wind-turbine.png";
import { Sailboat, Shield, Triangle, Wind } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="bg-white px-12 font-[Inter]">
      {/* Navigation Bar */}
      <nav className="flex flex-wrap items-center justify-between py-6">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 sm:h-12 sm:w-12">
            <Wind className="h-5 w-5 text-black sm:h-6 sm:w-6" />
          </div>
          <span className="text-center text-xs font-medium text-gray-900 sm:text-left sm:text-sm">
            Solar Energy
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400 sm:h-12 sm:w-12">
            <Sailboat className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>
          <span className="text-center text-xs font-medium text-gray-900 sm:text-left sm:text-sm">
            Home Dashboard
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 sm:h-12 sm:w-12">
            <Triangle className="h-5 w-5 fill-current text-black sm:h-6 sm:w-6" />
          </div>
          <span className="text-center text-xs font-medium text-gray-900 sm:text-left sm:text-sm">
            Real-Time Monitoring
          </span>
        </div>

        <div className="hidden flex-col items-center gap-2 sm:flex sm:flex-row sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400 sm:h-12 sm:w-12">
            <Shield className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>
          <span className="text-center text-xs font-medium text-gray-900 sm:text-left sm:text-sm">
            Anomaly Detection
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 py-4 md:px-6 md:py-16">
        <div>
          {/* Hero Section */}
          <div className="mb-12 md:mb-24">
            <h1 className="text-4xl leading-tight font-bold text-black sm:text-5xl sm:leading-20 md:text-7xl md:leading-32 xl:text-8xl">
              <div>Monitor Your Home's</div>
              <div className="flex flex-row items-center gap-4 sm:gap-8">
                <span>Solar Energy</span>
                <div className="relative">
                  <img
                    src={imgWindTurbine}
                    alt="Solar panels on a house roof"
                    className="max-h-8 rounded-xl object-cover sm:max-h-16 md:max-h-20 md:rounded-2xl"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-8">
                <span>with Real-Time</span>
              </div>
              <div className="flex flex-row items-center gap-4 sm:gap-8">
                <span>Insights & Alerts</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400 sm:h-14 sm:w-14 md:h-16 md:w-16">
                  <Triangle className="h-5 w-5 fill-current text-white sm:h-7 sm:w-7 md:h-8 md:w-8" />
                </div>
              </div>
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
}
