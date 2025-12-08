// import { useGetSolarUnitForUserQuery } from "@/lib/redux/query";
// import DataChart from "./components/DataChart";
// import { useUser } from "@clerk/clerk-react";

// const DashboardPage = () => {
//   const { user, isLoaded } = useUser();

//   const { 
//     data: solarUnit, 
//     isLoading: isLoadingSolarUnit, 
//     isError: isErrorSolarUnit, 
//     error: errorSolarUnit 
//   } = useGetSolarUnitForUserQuery();

//   // 1. Loading State
//   if (isLoadingSolarUnit || !isLoaded) {
//     return <div className="p-8">Loading dashboard...</div>;
//   }

//   // 2. Error State
//   if (isErrorSolarUnit) {
//     return <div className="p-8 text-red-500">Error: {errorSolarUnit.message}</div>;
//   }

//   // 3. EMPTY STATE (The Missing Fix)
//   // If loading finished but solarUnit is null, show a message instead of crashing
//   if (!solarUnit) {
//     return (
//       <main className="mt-4 p-8">
//         <h1 className="text-4xl font-bold text-foreground">
//           {user?.firstName}'s House
//         </h1>
//         <div className="mt-8 p-6 border rounded-lg bg-gray-50">
//           <h2 className="text-xl font-semibold">No Solar Unit Found</h2>
//           <p className="text-gray-600 mt-2">
//             You don't have a solar unit linked to your account yet. 
//             Please ask an administrator to assign one to you.
//           </p>
//         </div>
//       </main>
//     );
//   }

//   console.log(solarUnit);

//   // 4. Success State (Safe to access ._id now)
//   return (
//     <main className="mt-4">
//       <h1 className="text-4xl font-bold text-foreground">
//         {user?.firstName}'s House
//       </h1>
//       <p className="text-gray-600 mt-2">
//         Welcome back to your Solar Energy Production Dashboard
//       </p>
//       <div className="mt-8">
//         {/* We can safely access ._id here because we passed the check above */}
//         <DataChart solarUnitId={solarUnit._id} />
//       </div>
//     </main>
//   );
// };

// export default DashboardPage;



import { useGetSolarUnitForUserQuery } from "@/lib/redux/query";
import { useUser } from "@clerk/clerk-react";

// Import your components
import DataChart from "./components/DataChart";
import WeatherWidget from "../wather/WeatherWidget"; // New
import CapacityFactorChart from "../wather/CapacityFactorChart"; // New

const DashboardPage = () => {
  const { user, isLoaded } = useUser();

  const { 
    data: solarUnit, 
    isLoading: isLoadingSolarUnit, 
    isError: isErrorSolarUnit, 
    error: errorSolarUnit 
  } = useGetSolarUnitForUserQuery();

  // 1. Loading State
  if (isLoadingSolarUnit || !isLoaded) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  // 2. Error State
  if (isErrorSolarUnit) {
    return <div className="p-8 text-red-500">Error: {errorSolarUnit.message}</div>;
  }

  // 3. EMPTY STATE
  if (!solarUnit) {
    return (
      <main className="mt-4 p-8">
        <h1 className="text-4xl font-bold text-foreground">
          {user?.firstName}'s House
        </h1>
        <div className="mt-8 p-6 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold">No Solar Unit Found</h2>
          <p className="text-gray-600 mt-2">
            You don't have a solar unit linked to your account yet. 
            Please ask an administrator to assign one to you.
          </p>
        </div>
      </main>
    );
  }

  // 4. MAIN DASHBOARD (Updated with New Widgets)
  return (
    <main className="mt-4 space-y-8">
      
      {/* Header Section */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">
            {user?.firstName}'s House
        </h1>
        <p className="text-gray-600 mt-2">
            Monitoring Unit: <span className="font-mono font-medium">{solarUnit.serialNumber}</span>
        </p>
      </div>

    
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <WeatherWidget />
      </div> */}

      {/* Pass the solarUnit data to the widget */}
<div className="lg:col-span-2"> 
   <WeatherWidget solarUnit={solarUnit} />
</div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Your Original Chart */}
        <div className="bg-card rounded-lg border shadow-sm p-4">
            <h3 className="font-semibold mb-4">Power Generation (Live)</h3>
            <DataChart solarUnitId={solarUnit._id} />
        </div>

        {/* The New Capacity Factor Chart */}
        <div className="bg-card rounded-lg border shadow-sm p-4">
            <CapacityFactorChart solarUnitId={solarUnit._id} />
        </div>
      </div>

    </main>
  );
};

export default DashboardPage;