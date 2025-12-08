import HeroSection from "./components/HeroSection";
import Problems from "./components/HeroSection/Problems";
import SolarEnergyGeneration from "./components/HeroSection/SolarEnergyGeneration";
import Solution from "./components/HeroSection/Solution";
import GoalsAndNeeds from "./components/HeroSection/GoalsAndNeeds";


const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <SolarEnergyGeneration />
      <Problems />
      <Solution />
      <GoalsAndNeeds />
    </main>
  );
};

export default HomePage;
