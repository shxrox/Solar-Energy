// import { useState } from "react";
// import { useNavigate, Link } from "react-router";
// import { useGetSolarUnitsQuery } from "@/lib/redux/query";
// import { Zap, Search, Plus, Calendar, Battery, Loader2, AlertCircle, Edit, Eye, User } from "lucide-react";

// export function SolarUnitsTab() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const { data: solarUnits, isLoading, isError, error } = useGetSolarUnitsQuery();

//   if (isLoading) {
//     return (
//       <div className="flex h-64 items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin opacity-20" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="py-6 flex items-center gap-3 text-red-600 border-t border-red-100">
//         <AlertCircle className="h-5 w-5 shrink-0" />
//         <p className="text-sm font-medium">{error?.message || "Error loading units"}</p>
//       </div>
//     );
//   }

//   // Safe filtering logic to prevent crashes if serialNumber is missing
//   const filteredUnits = (solarUnits || []).filter((unit) => 
//     unit?.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-12">
      
//       {/* --- CONTROLS BAR --- */}
//       <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
//         <div className="relative w-full sm:max-w-xs">
//             <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 opacity-40" />
//             <input
//                 type="text"
//                 placeholder="Search serial number..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="block w-full pl-8 py-2 bg-transparent border-b border-gray-200 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-sm"
//             />
//         </div>

//         <Link 
//             to="/admin/solar-units/create"
//             className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors uppercase tracking-widest"
//         >
//             <Plus className="h-4 w-4" />
//             Add New Unit
//         </Link>
//       </div>

//       {/* --- UNITS LIST (Transparent Grid) --- */}
//       <div className="grid gap-x-12 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
//         {filteredUnits.map((unit) => (
//           <div key={unit._id} className="flex flex-col space-y-4 group">
            
//             {/* Header Area */}
//             <div className="flex justify-between items-start border-b border-gray-100 pb-4 group-hover:border-gray-200 transition-colors">
//               <div className="flex items-center gap-3">
//                 <Zap className="h-5 w-5 text-yellow-500 fill-current" />
//                 <div>
//                   <h3 className="font-black text-xl tracking-tight leading-none uppercase">
//                     {unit.serialNumber}
//                   </h3>
//                   <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">
//                     ID: {unit._id?.slice(-8)}
//                   </p>
//                 </div>
//               </div>
//               <span className={`text-[10px] font-black uppercase tracking-widest ${
//                 unit.status?.toUpperCase() === "ACTIVE" ? "text-emerald-600" : 
//                 unit.status?.toUpperCase() === "MAINTENANCE" ? "text-orange-500" : "text-gray-400"
//               }`}>
//                 {unit.status}
//               </span>
//             </div>

//             {/* Owner Section */}
//             <div className="flex items-center gap-3 py-1">
//               <User className="h-4 w-4 text-gray-300" />
//               <p className="text-sm font-bold text-gray-700">
//                 {unit.userId?.firstName ? `${unit.userId.firstName} ${unit.userId.lastName || ""}` : "Unassigned"}
//               </p>
//             </div>

//             {/* Stats Row */}
//             <div className="grid grid-cols-2 gap-4 py-2">
//               <div className="space-y-1">
//                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Capacity</p>
//                 <div className="flex items-baseline gap-1 text-gray-900">
//                   <span className="text-2xl font-black">{unit.capacity}</span>
//                   <span className="text-xs font-bold opacity-30">W</span>
//                 </div>
//               </div>
//               <div className="space-y-1">
//                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Date</p>
//                 <div className="flex items-center justify-end gap-1.5 text-sm font-bold text-gray-600">
//                   <Calendar className="h-3.5 w-3.5 opacity-30" />
//                   <span>{new Date(unit.installationDate).toLocaleDateString()}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-6 pt-4 border-t border-gray-50 mt-auto">
//               <button
//                 onClick={() => navigate(`/admin/solar-units/${unit._id}/edit`)}
//                 className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1.5"
//               >
//                 <Edit className="h-3.5 w-3.5" /> Edit
//               </button>
//               <button
//                 onClick={() => navigate(`/admin/solar-units/${unit._id}`)}
//                 className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1.5"
//               >
//                 <Eye className="h-3.5 w-3.5" /> View
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {filteredUnits.length === 0 && (
//         <div className="py-20 text-center border-t border-gray-100">
//             <p className="text-gray-400 italic">No units match your search results.</p>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useGetSolarUnitsQuery } from "@/lib/redux/query";
import { Zap, Search, Plus, Calendar, Loader2, AlertCircle, Edit, Eye, User } from "lucide-react";

export function SolarUnitsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data: solarUnits, isLoading, isError, error } = useGetSolarUnitsQuery();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin opacity-20" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-6 flex items-center gap-3 text-red-600 border-t border-red-100">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">{error?.message || "Error loading units"}</p>
      </div>
    );
  }

  // ✅ UPDATED SEARCH LOGIC
  const filteredUnits = (solarUnits || []).filter((unit) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true; // Show all if search is empty

    // 1. Solar Unit Identifiers
    const matchesSerial = unit?.serialNumber?.toLowerCase().includes(term);
    const matchesId = unit?._id?.toLowerCase().includes(term);

    // 2. User Details (Handle potential missing user objects)
    const user = unit?.userId;
    const matchesFirstName = user?.firstName?.toLowerCase().includes(term);
    const matchesLastName = user?.lastName?.toLowerCase().includes(term);
    const matchesEmail = user?.email?.toLowerCase().includes(term);
    
    // 3. Combined Name Search (e.g. "John Doe")
    const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.toLowerCase();
    const matchesFullName = fullName.includes(term);

    return matchesSerial || matchesId || matchesFirstName || matchesLastName || matchesEmail || matchesFullName;
  });

  return (
    <div className="space-y-12">
      
      {/* --- CONTROLS BAR --- */}
      <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
        <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 opacity-40" />
            <input
                type="text"
                // ✅ Updated Placeholder
                placeholder="Search serial, user, or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-8 py-2 bg-transparent border-b border-gray-200 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-sm"
            />
        </div>

        <Link 
            to="/admin/solar-units/create"
            className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors uppercase tracking-widest"
        >
            <Plus className="h-4 w-4" />
            Add New Unit
        </Link>
      </div>

      {/* --- UNITS LIST (Transparent Grid) --- */}
      <div className="grid gap-x-12 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
        {filteredUnits.map((unit) => (
          <div key={unit._id} className="flex flex-col space-y-4 group">
            
            {/* Header Area */}
            <div className="flex justify-between items-start border-b border-gray-100 pb-4 group-hover:border-gray-200 transition-colors">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-yellow-500 fill-current" />
                <div>
                  <h3 className="font-black text-xl tracking-tight leading-none uppercase">
                    {unit.serialNumber}
                  </h3>
                  <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">
                    ID: {unit._id?.slice(-8)}
                  </p>
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${
                unit.status?.toUpperCase() === "ACTIVE" ? "text-emerald-600" : 
                unit.status?.toUpperCase() === "MAINTENANCE" ? "text-orange-500" : "text-gray-400"
              }`}>
                {unit.status}
              </span>
            </div>

            {/* Owner Section */}
            <div className="flex items-center gap-3 py-1">
              <User className="h-4 w-4 text-gray-300" />
              <div className="flex flex-col">
                <p className="text-sm font-bold text-gray-700 leading-tight">
                    {unit.userId?.firstName ? `${unit.userId.firstName} ${unit.userId.lastName || ""}` : "Unassigned"}
                </p>
                {/* Optional: Show email in small text for clarity */}
                {unit.userId?.email && (
                    <p className="text-[10px] text-gray-400 lowercase">{unit.userId.email}</p>
                )}
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Capacity</p>
                <div className="flex items-baseline gap-1 text-gray-900">
                  <span className="text-2xl font-black">{unit.capacity}</span>
                  <span className="text-xs font-bold opacity-30">W</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Date</p>
                <div className="flex items-center justify-end gap-1.5 text-sm font-bold text-gray-600">
                  <Calendar className="h-3.5 w-3.5 opacity-30" />
                  <span>{new Date(unit.installationDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-6 pt-4 border-t border-gray-50 mt-auto">
              <button
                onClick={() => navigate(`/admin/solar-units/${unit._id}/edit`)}
                className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1.5"
              >
                <Edit className="h-3.5 w-3.5" /> Edit
              </button>
              <button
                onClick={() => navigate(`/admin/solar-units/${unit._id}`)}
                className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1.5"
              >
                <Eye className="h-3.5 w-3.5" /> View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredUnits.length === 0 && (
        <div className="py-20 text-center border-t border-gray-100">
            <p className="text-gray-400 italic">No units match your search results.</p>
        </div>
      )}
    </div>
  );
}