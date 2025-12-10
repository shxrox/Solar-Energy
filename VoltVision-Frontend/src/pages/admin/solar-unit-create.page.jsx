// import { CreateSolarUnitForm } from "./components/CreateSolarUnitForm";

// export default function SolarUnitCreatePage() {

//   return (
//     <main className="mt-4">
//       <h1 className="text-4xl font-bold ">Create Solar Unit</h1>
//       <p className="text-gray-600 mt-2">Create a new solar unit</p>
//       <div className="mt-8">
//         <CreateSolarUnitForm />
//       </div>
//     </main>
//   );
// }
import { CreateSolarUnitForm } from "./components/CreateSolarUnitForm";
import { PlusCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function SolarUnitCreatePage() {
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
            <div className="p-2 rounded-lg ">
              <PlusCircle className="h-6 w-6" />
            </div>
            Create Solar Unit
          </h1>
          <p className="text-muted-foreground mt-2 text-lg ml-12">
            Register a new solar unit to the system infrastructure.
          </p>
        </div>
      </div>

      {/* --- FORM SECTION --- */}
      <div className="mt-8 p-1">
        {/* We wrap the form in a subtle layout or just render it directly depending on the form's internal styling */}
        <CreateSolarUnitForm />
      </div>
      
    </main>
  );
}