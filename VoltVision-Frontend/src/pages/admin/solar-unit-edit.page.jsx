// import { useGetSolarUnitByIdQuery } from "@/lib/redux/query";
// import { useNavigate, useParams } from "react-router";
// import { EditSolarUnitForm } from "./components/EditSolarUnitForm";

// export default function SolarUnitEditPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { data: solarUnit, isLoading: isLoadingSolarUnit, isError: isErrorSolarUnit, error: errorSolarUnit } = useGetSolarUnitByIdQuery(id);
  
//   console.log(solarUnit);

//   if (isLoadingSolarUnit) {
//     return <div>Loading...</div>;
//   }

//   if (isErrorSolarUnit) {
//     return <div>Error: {errorSolarUnit.message}</div>;
//   }

//   const handleEdit = () => {
//     // TODO: Navigate to edit page
//     console.log("Edit solar unit:", solarUnit._id);
//   };

//   const handleDelete = () => {
//     // TODO: Implement delete with confirmation
//     console.log("Delete solar unit:", solarUnit._id);
//   };

//   return (
//     <main className="mt-4">
//       <h1 className="text-4xl font-bold text-foreground">Edit Solar Unit</h1>
//       <h2 className="mt-4 text-2xl font-bold text-foreground">{solarUnit.serialNumber}</h2>
//       <p className="text-gray-600 mt-2">Edit the details of the solar unit</p>'
      
//       <div className="mt-8">
//         <EditSolarUnitForm solarUnit={solarUnit} />
        
//       </div>
//     </main>
//   );
// }


import { useGetSolarUnitByIdQuery } from "@/lib/redux/query";
import { useParams, Link } from "react-router"; // Combined imports
import { EditSolarUnitForm } from "./components/EditSolarUnitForm";
import { Settings, ArrowLeft, Loader2, AlertCircle } from "lucide-react";

export default function SolarUnitEditPage() {
  const { id } = useParams();

  const { 
    data: solarUnit, 
    isLoading, 
    isError, 
    error 
  } = useGetSolarUnitByIdQuery(id);
  
  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin opacity-50 text-primary" />
            <p className="text-sm opacity-60 font-medium">Loading unit details...</p>
        </div>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (isError) {
    return (
      <div className="p-8 flex justify-center">
        <div className="max-w-lg w-full rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-semibold text-sm">Error loading unit</h3>
            <div className="text-xs mt-1 text-red-700 opacity-90">
              {error?.message || "Please check your connection."}
            </div>
            <Link to="/admin/solar-units" className="text-xs font-bold mt-2 inline-block hover:underline">
              Return to List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN CONTENT ---
  return (
    <main className="p-4 md:p-8 space-y-8 max-w-5xl mx-auto pb-20 animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-4">
        <Link 
          to="/admin/solar-units" 
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to List
        </Link>
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight  flex items-center gap-3">
            <div className="p-2 rounded-lg">
              <Settings className="h-6 w-6" />
            </div>
            Edit Solar Unit
          </h1>
          <div className="ml-12 mt-1">
            <h2 className="text-xl font-semibold opacity-90 font-mono">
                {solarUnit.serialNumber}
            </h2>
            <p className="text-sm opacity-60">
                Modify configuration details and operational status.
            </p>
          </div>
        </div>
      </div>

      {/* --- FORM SECTION --- */}
      <div className="mt-8 p-1">
        <EditSolarUnitForm solarUnit={solarUnit} />
      </div>
      
    </main>
  );
}