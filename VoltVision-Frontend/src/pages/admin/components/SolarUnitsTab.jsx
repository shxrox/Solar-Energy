

// import { useState } from "react";
// import { useNavigate, Link } from "react-router";
// import { useGetSolarUnitsQuery } from "@/lib/redux/query";
// import { Zap, Search, Plus, Calendar, Battery, Loader2, AlertCircle, Edit, Eye } from "lucide-react";

// export function SolarUnitsTab() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const { data: solarUnits, isLoading: isLoadingSolarUnits, isError: isErrorSolarUnits, error: errorSolarUnits } = useGetSolarUnitsQuery();

//   // --- LOADING STATE ---
//   if (isLoadingSolarUnits) {
//     return (
//       <div className="flex h-64 items-center justify-center">
//         <div className="flex flex-col items-center gap-2">
//             <Loader2 className="h-8 w-8 animate-spin opacity-50" />
//             <p className="text-sm opacity-60">Loading solar units...</p>
//         </div>
//       </div>
//     );
//   }

//   // --- ERROR STATE ---
//   if (isErrorSolarUnits) {
//     return (
//       <div className="p-6 rounded-xl border border-red-200 bg-red-50/50 flex items-center gap-3 text-red-800">
//         <AlertCircle className="h-5 w-5 shrink-0" />
//         <div>
//             <h3 className="font-semibold text-sm">Error loading units</h3>
//             <p className="text-xs opacity-80">{errorSolarUnits?.message}</p>
//         </div>
//       </div>
//     );
//   }

//   const filteredUnits = searchTerm !== "" 
//     ? solarUnits.filter((unit) => unit.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())) 
//     : solarUnits;

//   return (
//     <div className="space-y-6">
      
//       {/* --- CONTROLS BAR --- */}
//       <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-1">
        
//         {/* Search Input */}
//         <div className="relative w-full sm:max-w-sm">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-4 w-4 opacity-50" />
//             </div>
//             <input
//                 type="text"
//                 placeholder="Search serial number..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-2 border rounded-lg bg-transparent focus:ring-2 focus:ring-opacity-50 outline-none transition-all placeholder:opacity-50"
//             />
//         </div>

//         {/* Add Button */}
//         <Link 
//             to="/admin/solar-units/create"
//             className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-content font-medium text-sm hover:opacity-90 transition-opacity shadow-sm w-full sm:w-auto justify-center"
//         >
//             <Plus className="h-4 w-4" />
//             Add New Unit
//         </Link>
//       </div>

//       {/* --- UNITS GRID --- */}
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {filteredUnits.map((unit) => (
//           // Main Card Container
//           <div 
//             key={unit._id} 
//             className="group rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-base-100"
//           >
//             {/* Header */}
//             <div className="p-6 pb-4 flex justify-between items-start">
//               <div className="flex items-center gap-3">
//                 <div className="p-2.5 rounded-lg bg-yellow-500/10 text-yellow-600">
//                   <Zap className="h-5 w-5 fill-current" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg tracking-tight leading-none mb-1">
//                     {unit.serialNumber}
//                   </h3>
//                   <p className="text-[10px] font-mono opacity-50 uppercase">
//                     ID: {unit._id.slice(-6)}
//                   </p>
//                 </div>
//               </div>
              
//               {/* Status Badge (Handles both 'Active' and 'ACTIVE') */}
//               <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
//                 unit.status?.toUpperCase() === "ACTIVE" ? "bg-green-500/10 text-green-700 border-green-200/50" : 
//                 unit.status?.toUpperCase() === "MAINTENANCE" ? "bg-orange-500/10 text-orange-700 border-orange-200/50" :
//                 "bg-gray-500/10 text-gray-700 border-gray-200/50"
//               }`}>
//                 {unit.status}
//               </span>
//             </div>

//             {/* Divider */}
//             <div className="h-px w-full bg-current opacity-5" />

//             {/* Content */}
//             <div className="p-6 pt-4 space-y-5">
//               <div className="flex items-center justify-between">
//                 <div className="space-y-1">
//                     <span className="text-[10px] font-bold opacity-40 uppercase tracking-wider">Capacity</span>
//                     <div className="flex items-baseline gap-1">
//                         <Battery className="w-3.5 h-3.5 opacity-60" />
//                         <span className="text-xl font-bold">{unit.capacity}</span>
//                         <span className="text-xs font-medium opacity-60">W</span>
//                     </div>
//                 </div>
//                 <div className="space-y-1 text-right">
//                     <span className="text-[10px] font-bold opacity-40 uppercase tracking-wider">Installed</span>
//                     <div className="flex items-center justify-end gap-1.5 text-sm font-medium opacity-80 mt-1">
//                         <Calendar className="h-3.5 w-3.5 opacity-60" />
//                         <span>{new Date(unit.installationDate).toLocaleDateString()}</span>
//                     </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="grid grid-cols-2 gap-3 pt-2">
//                 <button
//                   onClick={() => navigate(`/admin/solar-units/${unit._id}/edit`)}
//                   className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border hover:bg-current/5 transition-colors text-sm font-medium"
//                 >
//                   <Edit className="h-3.5 w-3.5" /> Edit
//                 </button>
//                 <button
//                   onClick={() => navigate(`/admin/solar-units/${unit._id}`)}
//                   className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border bg-base-200/50 hover:bg-base-200 transition-colors text-sm font-medium"
//                 >
//                   <Eye className="h-3.5 w-3.5" /> View
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {filteredUnits.length === 0 && (
//         <div className="py-20 text-center border-2 border-dashed rounded-xl opacity-60">
//             <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-base-200 mb-3">
//                 <Search className="w-6 h-6 opacity-50" />
//             </div>
//             <p className="font-medium">No units found</p>
//             <p className="text-sm opacity-70 mt-1">Try adjusting your search terms</p>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useGetSolarUnitsQuery } from "@/lib/redux/query";
import { Zap, Search, Plus, Calendar, Battery, Loader2, AlertCircle, Edit, Eye, User } from "lucide-react";

export function SolarUnitsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data: solarUnits, isLoading: isLoadingSolarUnits, isError: isErrorSolarUnits, error: errorSolarUnits } = useGetSolarUnitsQuery();

  if (isLoadingSolarUnits) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin opacity-50" />
            <p className="text-sm opacity-60">Loading solar units...</p>
        </div>
      </div>
    );
  }

  if (isErrorSolarUnits) {
    return (
      <div className="p-6 rounded-xl border border-red-200 bg-red-50/50 flex items-center gap-3 text-red-800">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <div>
            <h3 className="font-semibold text-sm">Error loading units</h3>
            <p className="text-xs opacity-80">{errorSolarUnits?.message}</p>
        </div>
      </div>
    );
  }

  const filteredUnits = searchTerm !== "" 
    ? solarUnits.filter((unit) => unit.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())) 
    : solarUnits;

  return (
    <div className="space-y-6">
      
      {/* --- CONTROLS BAR --- */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-1">
        <div className="relative w-full sm:max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 opacity-50" />
            </div>
            <input
                type="text"
                placeholder="Search serial number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border rounded-lg bg-transparent focus:ring-2 focus:ring-opacity-50 outline-none transition-all placeholder:opacity-50"
            />
        </div>

        <Link 
            to="/admin/solar-units/create"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-content font-medium text-sm hover:opacity-90 transition-opacity shadow-sm w-full sm:w-auto justify-center"
        >
            <Plus className="h-4 w-4" />
            Add New Unit
        </Link>
      </div>

      {/* --- UNITS GRID --- */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredUnits.map((unit) => (
          <div 
            key={unit._id} 
            className="group rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-base-100"
          >
            {/* Header */}
            <div className="p-6 pb-4 flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-yellow-500/10 text-yellow-600">
                  <Zap className="h-5 w-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-bold text-lg tracking-tight leading-none mb-1">
                    {unit.serialNumber}
                  </h3>
                  <p className="text-[10px] font-mono opacity-50 uppercase">
                    UNIT ID: {unit._id.slice(-6)}
                  </p>
                </div>
              </div>
              
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                unit.status?.toUpperCase() === "ACTIVE" ? "bg-green-500/10 text-green-700 border-green-200/50" : 
                unit.status?.toUpperCase() === "MAINTENANCE" ? "bg-orange-500/10 text-orange-700 border-orange-200/50" :
                "bg-gray-500/10 text-gray-700 border-gray-200/50"
              }`}>
                {unit.status}
              </span>
            </div>

            {/* --- NEW USER SECTION --- */}
            <div className="px-6 pb-4">
               <div className="flex items-center gap-2 p-2 rounded-lg bg-current/5 border border-current/5">
                  <User className="h-4 w-4 opacity-40" />
                  <div>
                    <p className="text-xs font-bold leading-none">
                      {unit.userId?.firstName ? `${unit.userId.firstName} ${unit.userId.lastName || ""}` : "Unassigned"}
                    </p>
                    <p className="text-[9px] font-mono opacity-40 uppercase mt-0.5">
                      OWNER ID: {unit.userId?._id?.slice(-6) || "N/A"}
                    </p>
                  </div>
               </div>
            </div>

            <div className="h-px w-full bg-current opacity-5" />

            {/* Content */}
            <div className="p-6 pt-4 space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <span className="text-[10px] font-bold opacity-40 uppercase tracking-wider">Capacity</span>
                    <div className="flex items-baseline gap-1">
                        <Battery className="w-3.5 h-3.5 opacity-60" />
                        <span className="text-xl font-bold">{unit.capacity}</span>
                        <span className="text-xs font-medium opacity-60">W</span>
                    </div>
                </div>
                <div className="space-y-1 text-right">
                    <span className="text-[10px] font-bold opacity-40 uppercase tracking-wider">Installed</span>
                    <div className="flex items-center justify-end gap-1.5 text-sm font-medium opacity-80 mt-1">
                        <Calendar className="h-3.5 w-3.5 opacity-60" />
                        <span>{new Date(unit.installationDate).toLocaleDateString()}</span>
                    </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => navigate(`/admin/solar-units/${unit._id}/edit`)}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border hover:bg-current/5 transition-colors text-sm font-medium"
                >
                  <Edit className="h-3.5 w-3.5" /> Edit
                </button>
                <button
                  onClick={() => navigate(`/admin/solar-units/${unit._id}`)}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border bg-base-200/50 hover:bg-base-200 transition-colors text-sm font-medium"
                >
                  <Eye className="h-3.5 w-3.5" /> View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUnits.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed rounded-xl opacity-60">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-base-200 mb-3">
                <Search className="w-6 h-6 opacity-50" />
            </div>
            <p className="font-medium">No units found</p>
            <p className="text-sm opacity-70 mt-1">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}