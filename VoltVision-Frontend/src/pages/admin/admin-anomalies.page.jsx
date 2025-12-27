
// import React, { useState } from "react";
// // ✅ 1. Import the Resolve Mutation so Admins can fix issues too
// import { useGetAllAnomaliesAdminQuery, useResolveAnomalyMutation } from "@/lib/redux/query";
// import { 
//   ShieldAlert, 
//   Loader2, 
//   Filter, 
//   Search, // ✅ Import Search Icon
//   CheckCircle, 
//   AlertTriangle, 
//   Info,
//   Download // For the future Export button
// } from "lucide-react";

// const AdminAnomaliesPage = () => {
//   const [filterSeverity, setFilterSeverity] = useState("ALL");
//   const [searchTerm, setSearchTerm] = useState(""); // ✅ State for Search
  
//   // Queries & Mutations
//   const { data: anomalies, isLoading, isError } = useGetAllAnomaliesAdminQuery(undefined, {
//     pollingInterval: 5000, 
//   });
  
//   const [resolveAnomaly, { isLoading: isResolving }] = useResolveAnomalyMutation();

//   // ✅ Advanced Filter Logic (Severity + Search)
//   const filteredAnomalies = anomalies?.filter((item) => {
//     // 1. Filter by Severity
//     const matchesSeverity = filterSeverity === "ALL" || item.severity === filterSeverity;
    
//     // 2. Filter by Search (Serial Number OR User Email)
//     const searchLower = searchTerm.toLowerCase();
//     const matchesSearch = 
//         item.solarUnitId?.serialNumber?.toLowerCase().includes(searchLower) ||
//         item.solarUnitId?.userId?.email?.toLowerCase().includes(searchLower) ||
//         item.type.toLowerCase().includes(searchLower);

//     return matchesSeverity && matchesSearch;
//   });

//   if (isLoading) return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="animate-spin" /></div>;
//   if (isError) return <div className="p-8 text-center text-red-600">Failed to load data.</div>;

//   return (
//     <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
//       {/* Header & Stats ... (Same as before) */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight text-gray-900">System Health Overview</h1>
//           <p className="text-sm text-gray-500">
//             Monitoring <span className="font-medium text-gray-900">{anomalies?.length || 0}</span> detected anomalies.
//           </p>
//         </div>
//       </div>

//       {/* 2. Filters & Actions Bar */}
//       <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        
//         {/* Left: Severity Filters */}
//         <div className="flex items-center gap-2 overflow-x-auto">
//             <Filter className="w-4 h-4 text-gray-500 shrink-0" />
//             <span className="text-sm font-medium text-gray-700 mr-2">Filter:</span>
//             {['ALL', 'Critical', 'Warning', 'Info'].map((sev) => (
//                 <button
//                     key={sev}
//                     onClick={() => setFilterSeverity(sev)}
//                     className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
//                         filterSeverity === sev 
//                         ? 'bg-slate-900 text-white' 
//                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                     }`}
//                 >
//                     {sev}
//                 </button>
//             ))}
//         </div>

//         {/* Right: Search Input */}
//         <div className="relative w-full md:w-64">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
//             <input 
//                 type="text"
//                 placeholder="Search serial, email, or type..."
//                 className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//             />
//         </div>
//       </div>

//       {/* 3. Data Table */}
//       <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//             <table className="w-full text-sm text-left">
//                 <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs">
//                     <tr>
//                         <th className="px-6 py-3 font-semibold">Serial / User</th>
//                         <th className="px-6 py-3 font-semibold">Issue</th>
//                         <th className="px-6 py-3 font-semibold">Severity</th>
//                         <th className="px-6 py-3 font-semibold">Detected</th>
//                         <th className="px-6 py-3 font-semibold text-right">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                     {filteredAnomalies?.length > 0 ? (
//                         filteredAnomalies.map((item) => (
//                             <tr key={item._id} className="hover:bg-gray-50 transition-colors">
//                                 {/* Serial & Email Combined */}
//                                 <td className="px-6 py-4">
//                                     <div className="font-mono font-medium text-gray-700">
//                                         {item.solarUnitId?.serialNumber}
//                                     </div>
//                                     <div className="text-xs text-gray-400">
//                                         {item.solarUnitId?.userId?.email}
//                                     </div>
//                                 </td>
                                
//                                 <td className="px-6 py-4 font-medium text-gray-900">{item.type}</td>

//                                 <td className="px-6 py-4">
//                                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
//                                         item.severity === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' :
//                                         item.severity === 'Warning' ? 'bg-orange-50 text-orange-700 border-orange-200' :
//                                         'bg-blue-50 text-blue-700 border-blue-200'
//                                     }`}>
//                                         {item.severity}
//                                     </span>
//                                 </td>

//                                 <td className="px-6 py-4 text-gray-500">
//                                     {new Date(item.timestamp).toLocaleDateString()}
//                                 </td>

//                                 {/* ✅ Action Button: Admin Resolve */}
//                                 <td className="px-6 py-4 text-right">
//                                     {item.status === 'OPEN' ? (
//                                         <button
//                                             onClick={() => resolveAnomaly(item._id)}
//                                             disabled={isResolving}
//                                             className="text-xs font-medium text-blue-600 hover:text-blue-800 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition-colors"
//                                         >
//                                             Mark Resolved
//                                         </button>
//                                     ) : (
//                                         <span className="text-xs font-bold text-green-600 flex items-center justify-end gap-1">
//                                             <CheckCircle className="w-3 h-3" /> Resolved
//                                         </span>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
//                                 No anomalies found matching "{searchTerm}".
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminAnomaliesPage;

import React, { useState } from "react";
import { useGetAllAnomaliesAdminQuery, useResolveAnomalyMutation } from "@/lib/redux/query";
import { 
  ShieldAlert, 
  Loader2, 
  Filter, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Download // ✅ Used for the Export Button
} from "lucide-react";

const AdminAnomaliesPage = () => {
  const [filterSeverity, setFilterSeverity] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  
  // 1. Fetch ALL anomalies
  const { data: anomalies, isLoading, isError } = useGetAllAnomaliesAdminQuery(undefined, {
    pollingInterval: 5000, 
  });
  
  // 2. Resolve Mutation
  const [resolveAnomaly, { isLoading: isResolving }] = useResolveAnomalyMutation();

  // 3. Filter Logic
  const filteredAnomalies = anomalies?.filter((item) => {
    const matchesSeverity = filterSeverity === "ALL" || item.severity === filterSeverity;
    
    const term = searchTerm.toLowerCase().trim();
    if (!term) return matchesSeverity;

    const matchesSearch = 
        item.solarUnitId?.serialNumber?.toLowerCase().includes(term) ||
        item.solarUnitId?.userId?.email?.toLowerCase().includes(term) ||
        item.type.toLowerCase().includes(term);

    return matchesSeverity && matchesSearch;
  });

  // ✅ 4. CSV Export Function
  const downloadCSV = () => {
    if (!filteredAnomalies || filteredAnomalies.length === 0) return;

    // Define Headers
    const headers = ["Serial Number", "Anomaly Type", "Severity", "User Email", "Detected At", "Status", "Description"];
    
    // Map Data to CSV Format
    const rows = filteredAnomalies.map(item => [
      item.solarUnitId?.serialNumber || "N/A",
      item.type,
      item.severity,
      item.solarUnitId?.userId?.email || "N/A",
      new Date(item.timestamp).toLocaleString(), // Readable Date
      item.status,
      `"${(item.description || "").replace(/"/g, '""')}"` // Escape quotes for CSV safety
    ]);

    // Combine Headers and Rows
    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");

    // Create Download Link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `anomaly_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground text-sm">Loading system health logs...</p>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (isError) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg border border-red-200">
        <ShieldAlert className="w-10 h-10 mx-auto mb-2" />
        <p className="font-semibold">Failed to load anomaly data.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* 1. Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">System Health Overview</h1>
          <p className="text-sm text-gray-500">
            Monitoring <span className="font-medium text-gray-900">{anomalies?.length || 0}</span> detected anomalies across the fleet.
          </p>
        </div>
        
        <div className="flex gap-2">
            <div className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {anomalies?.filter(a => a.severity === 'Critical' && a.status === 'OPEN').length} Critical
            </div>
            <div className="px-3 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-md text-sm font-medium flex items-center gap-2">
                <Info className="w-4 h-4" />
                {anomalies?.filter(a => a.severity === 'Warning' && a.status === 'OPEN').length} Warnings
            </div>
        </div>
      </div>

      {/* 2. Controls Bar (Filters & Search & Export) */}
      <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        
        {/* Left: Severity Filters */}
        <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="text-sm font-medium text-gray-700 mr-2">Filter:</span>
            {['ALL', 'Critical', 'Warning', 'Info'].map((sev) => (
                <button
                    key={sev}
                    onClick={() => setFilterSeverity(sev)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        filterSeverity === sev 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    {sev}
                </button>
            ))}
        </div>

        {/* Right: Search & Export */}
        <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input 
                    type="text"
                    placeholder="Search serial, email, or type..."
                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* ✅ Export Button */}
            <button
                onClick={downloadCSV}
                title="Export filtered data to CSV"
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm whitespace-nowrap"
            >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
            </button>
        </div>
      </div>

      {/* 3. Data Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs">
                    <tr>
                        <th className="px-6 py-3 font-semibold">Serial / User</th>
                        <th className="px-6 py-3 font-semibold">Issue</th>
                        <th className="px-6 py-3 font-semibold">Severity</th>
                        <th className="px-6 py-3 font-semibold">Detected</th>
                        <th className="px-6 py-3 font-semibold text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredAnomalies?.length > 0 ? (
                        filteredAnomalies.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                {/* Serial & Email */}
                                <td className="px-6 py-4">
                                    <div className="font-mono font-medium text-gray-700">
                                        {item.solarUnitId?.serialNumber || "N/A"}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {item.solarUnitId?.userId?.email || "Unknown"}
                                    </div>
                                </td>
                                
                                <td className="px-6 py-4 font-medium text-gray-900">{item.type}</td>

                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                        item.severity === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' :
                                        item.severity === 'Warning' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                        'bg-blue-50 text-blue-700 border-blue-200'
                                    }`}>
                                        {item.severity}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-gray-500">
                                    {new Date(item.timestamp).toLocaleDateString()}
                                </td>

                                <td className="px-6 py-4 text-right">
                                    {item.status === 'OPEN' ? (
                                        <button
                                            onClick={() => resolveAnomaly(item._id)}
                                            disabled={isResolving}
                                            className="text-xs font-medium text-blue-600 hover:text-blue-800 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition-colors"
                                        >
                                            Mark Resolved
                                        </button>
                                    ) : (
                                        <span className="text-xs font-bold text-green-600 flex items-center justify-end gap-1">
                                            <CheckCircle className="w-3 h-3" /> Resolved
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                No anomalies found matching your criteria.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnomaliesPage;